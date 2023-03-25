import { iStorage, iStorageFactory, iStorageType } from '../src/interface/storage'
import { MongoStorage } from '../src/storage/mongodb_storage'
import { Registry } from '../src/models/resgistry';
import { EnvVars } from '../src/global.env';

var storage: iStorage = new MongoStorage(EnvVars.mongodb_uri, EnvVars.mongodb_db)

test("Test Storage MongoDB", async () => {
    var ret = await storage.database.command({ ping: "1" });
    expect(ret.ok).toEqual(1);
})

afterAll(async () => { await storage.client.close(); });