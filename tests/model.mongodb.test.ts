import { iStorage, iStorageFactory, iStorageType } from '../src/interface/storage'
import { iModel } from '../src/interface/model';
import { Registry } from '../src/models/resgistry';


const storage: iStorage = iStorageFactory(iStorageType.mongodb);

async function insertOne<T>(document: iModel) {
    // insertOne
    var ret = await storage.insertOne<T>(document._type, document);
    expect(ret.acknowledged).toEqual(true);
}

async function deleteOne<T>(document: iModel) {
    // deleteOne
    var ret = await storage.deleteOne<T>(document._type, { "_id": document._id });
    expect(ret.acknowledged).toEqual(true);
    expect(ret.deletedCount).toEqual(1);
}

describe("Test Registry", () => {
    let registry: Registry = new Registry("test", "test", "test@test.com");

    test("Test CRUD", async () => {
        await insertOne<Registry>(registry);
        // get
        var ret = await storage.get<Registry>("registry", { "email": registry.email });
        expect(ret.length).toEqual(1);

        var newName = "newName";
        var getOne: Registry = await storage.getOne<Registry>("registry", { "email": registry.email });
        getOne.firstName = newName;
        // replaceOne 
        var replace = await storage.replaceOne<Registry>("registry", getOne);
        console.log(replace);
        // getOne
        var currentRet: Registry = await storage.getOne<Registry>("registry", { _id: getOne._id })
        expect(newName).toEqual(currentRet.firstName);

        await deleteOne<Registry>(registry);
    });

    afterAll(async () => {
        await storage.client.close();
    });
})
