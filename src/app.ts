import express from 'express';
import { MongoStorage } from './storage/mongodb_storage'
import { iStorage } from './interface/storage'
import { EnvVars } from './global.env'
import { Roster } from './models/roster'
import { Registry } from './models/resgistry';

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded());

const port: number = 3001;

// TODO: create factory for storage
const storageClient: iStorage = new MongoStorage(EnvVars.mongodb_uri, "cvhs");

app.post('/registry', async (_req, _res) => {

    var incoming = _req.body;
    var filter = {
        "firstName": incoming.firstName,
        "lastName": incoming.lastName
    }
    console.log(filter);

    var document = {
        "firstName": incoming.firstName,
        "lastName": incoming.lastName,
        "email": incoming.email
    };
    console.log(document)

    // 1. check the submitted last name is part of the class
    var roster = await storageClient.getOne<Roster>("roster", filter)
    console.log(roster)

    if (roster) {
        // 2. check that they haven't previously registered
        var registry = await storageClient.getOne<Registry>("registry", filter)
        if (registry) {
            _res.send("Already registered.");
        } else {
            await storageClient.insertOne<Registry>("registry", document)
        }
    }
    // 3. add to registry
    _res.send();
});

// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
