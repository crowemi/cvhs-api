import express from 'express';
import { iStorage, iStorageFactory } from './interface/storage'
import { Roster, RosterData } from './models/roster'
import { Registry } from './models/resgistry';
import { EnvVars } from './global.env'
import { ProcessError } from './helpers';
import { ObjectId } from 'mongodb';


const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

const port: number = 3001;

const storageClient: iStorage = iStorageFactory(EnvVars.storage_type)

app.get('/metrics', async (_req, _res) => {
    var registryCount = await storageClient.getMetrics("registry", "count");
    console.log(registryCount);
    _res.send({ registryCount: registryCount });
})
app.post('/registry', async (_req, _res) => {

    var incoming = _req.body;
    console.log(incoming)

    var registry = new Registry(incoming.firstName, incoming.lastName, incoming.email)
    console.log(registry)

    try {
        // 1. check the submitted last name is part of the roster
        var roster = await storageClient.getOne<Roster>("roster", {
            "lastName": incoming.lastName
        })
        // what happens if there are multiple records returned, need to filter by first name too
        console.log(roster)
    } catch (Error) {
        ProcessError(_res, `Failed to retreive roster for ${incoming.lastName}`, Error)
    }

    if (roster) {
        // 2. check that they haven't previously registered
        try {
            var check_registry = await storageClient.getOne<Registry>("registry", {
                "lastName": incoming.lastName
            });
            console.debug(check_registry)
        } catch (Error) {
            ProcessError(_res, `Failed to retreive registry for ${incoming.lastName}`, Error)
        }

        if (check_registry) {
            console.debug(`${registry.firstName} ${registry.lastName} already registered.`);
            _res.send("Already registered.");
        } else {
            try {
                // 3. add to registry
                var insert = await storageClient.insertOne<Registry>("registry", registry);
                console.debug(insert)
                var res = `${registry.firstName} ${registry.lastName} registered successfully.`;
                console.debug(res)
                // 4. update roster with timestamp
                var data = {
                    registryID: insert._id,
                    incoming: incoming
                }
                console.debug(data);
                var update = await storageClient.updateOne<Roster>("roster", { _id: new ObjectId(roster._id) }, { $set: { data: data } })
                console.debug(update)
                _res.send(res)
            } catch (Error) {
                ProcessError(_res, `Failed to insert registry for ${incoming.lastName}`, Error)
            }
        }
    } else {
        var res = `${incoming.firstName} ${incoming.lastName} not part of roster.`;
        _res.send(res)
    }
});

// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
