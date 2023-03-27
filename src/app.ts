import express from 'express';
import { iStorage, iStorageFactory, iStorageType } from './interface/storage'
import { Roster } from './models/roster'
import { Registry } from './models/resgistry';
import { Log } from './models/log';
import { EnvVars } from './global.env'
import { HealthCheck, ProcessError } from './helpers/common';
import { ObjectId } from 'mongodb';


const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

const port: number = Number(EnvVars.port);
const storageClient: iStorage = iStorageFactory(iStorageType.mongodb)

app.get('/health', (_req, _res) => {
    var isSuccessful = HealthCheck();
    _res.send(isSuccessful);
});

app.get('/metrics', async (_req, _res) => {
    var registryCount = await storageClient.getMetrics("registry", "count");
    console.debug(registryCount);
    return _res.send({ code: 200, metrics: { registryCount: registryCount } });
});
app.get('/registry/:id', async (_req, _res) => {
    var id = _req.params.id;
    console.log(id);
    var registry = await storageClient.getOne<Registry>("registry", { _id: new ObjectId(id) });
    console.log(registry);
    return _res.send({ code: 200, payload: { registry: registry } })
});
app.post('/registry', async (_req, _res) => {

    var incoming = _req.body;
    console.log(incoming)

    var registry: Registry = new Registry(incoming.firstName, incoming.lastName, incoming.email)
    console.log(registry)

    try {
        // 1. check the submitted last name is part of the roster
        var roster = await storageClient.get<Roster>(
            "roster",
            { '$text': { "$search": `${incoming.firstName} ${incoming.lastName}` } }
        )
        roster.forEach((r: Roster) => {
            // make sure that the first names match
            if (r.firstName.toLowerCase() == incoming.firstName.toLowerCase() && r.lastName.toLocaleLowerCase() == incoming.lastName.toLowerCase()) {
                roster = r;
                console.debug("First/Last Name match.")
            } else {
                roster = null;
                console.debug("First/Last Name mismatch.")
            }
        })
        console.log(roster);
    } catch (Error) {
        ProcessError(_res, `Failed to retreive roster for ${incoming.firstName} ${incoming.lastName}`, Error)
    }

    if (roster && roster._id) {
        // 2. check that they haven't previously registered
        if (roster.data) {
            console.debug(`${registry.firstName} ${registry.lastName} already registered.`);
            return _res.send({ code: 202, message: "Already registered." });
        } else {
            try {
                // 3. add to registry
                var insert = await storageClient.insertOne<Registry>("registry", registry);
                console.debug(insert)
                var res = `${registry.firstName} ${registry.lastName} registered successfully.`;
                console.debug(res)
                // 4. update roster with timestamp
                var data = {
                    registryID: insert.insertedId,
                    incoming: incoming
                }
                console.debug(data);
                var update = await storageClient.updateOne<Roster>("roster", { _id: new ObjectId(roster._id) }, { $set: { data: data } })
                console.debug(update)
                return _res.send({ code: 200, payload: { id: insert.insertedId, message: res } })
            } catch (Error) {
                ProcessError(_res, `Failed to insert registry for ${incoming.lastName}`, Error)
            }
        }
    } else {
        var res = `${incoming.firstName} ${incoming.lastName} not part of roster.`;
        return _res.send({ code: 202, payload: { message: res } })
    }
});

app.post('/log', async (_req, _res) => {
    var incoming = _req.body;
    Log.processLog(storageClient, incoming.message, incoming.severity, incoming.source, incoming.ip);
    return _res.send({ code: 200 })
});

// Server setup
app.listen(port, () => { });
