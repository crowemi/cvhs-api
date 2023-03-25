import { iStorage, iStorageFactory, iStorageType } from '../src/interface/storage'
import { Registry } from '../src/models/resgistry';

const client: iStorage = iStorageFactory(iStorageType.mongodb);

test("Test Registry", async () => {
    // create register
    var registry = new Registry("test", "test", "test@test.com");
    var ret = await client.insertOne<Registry>("registry", registry);
    expect(ret.acknowledged).toEqual(true);

    // test duplicate key error
});