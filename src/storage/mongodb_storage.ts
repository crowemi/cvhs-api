import { MongoClient, ServerApiVersion, Db, MongoClientOptions } from "mongodb";
import { iStorage } from "../interface/storage";
import { iModel } from "../interface/model";

class MongoStorage implements iStorage {
    public client: MongoClient;
    public database: Db;

    constructor(uri: string, database: string) {
        const options: MongoClientOptions = {
            serverApi: ServerApiVersion.v1,
        }
        this.client = new MongoClient(uri, options)
        this.database = this.client.db(database)
    }

    async getOne<T>(collection: string, filter: object): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.findOne(filter)
    }

    async get<T>(collection: string, filter: object): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.find(filter).toArray();
    }

    async insertOne<T>(collection: string, document: any): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.insertOne(document);
    }

    async updateOne<T>(collection: string, filter: object, options: object): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.updateOne(filter, options);
    }

    async deleteOne<T>(collection: string, filter: object): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.deleteOne(filter);
    }

    async replaceOne<T>(collection: string, document: iModel): Promise<T> {
        var col = this.database.collection(collection);
        document.updated = new Date();
        return await <T>col.replaceOne({ _id: document._id }, document);
    }

    async getMetrics<T>(collection: string, metric: string): Promise<T> {
        var col = this.database.collection(collection);
        return await <T>col.countDocuments();
    }
}

export { MongoStorage }