import { MongoClient, ServerApiVersion, Db, MongoClientOptions } from "mongodb";
import { iStorage } from "../interface/storage";

class MongoStorage implements iStorage {
    public client: MongoClient;
    private database: Db;
    constructor(uri: string, database: string) {
        const options: MongoClientOptions = {
            serverApi: ServerApiVersion.v1,
        }
        this.client = new MongoClient(uri, options)
        this.database = this.client.db(database)
    }

    async getOne<T>(collection: string, filter: object): Promise<T> {
        var col = this.database.collection(collection);
        var ret = await <T>col.findOne(filter)
        return ret
    }

    async insertOne<T>(collection: string, document: object): Promise<T> {
        var col = this.database.collection(collection);
        var ret = await <T>col.insertOne(document)
        return ret
    }
}

export { MongoStorage }