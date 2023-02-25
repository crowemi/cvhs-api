import { MongoClient } from 'mongodb';

interface iStorage {
    client: MongoClient;
    getOne<T>(collection: string, filter: object): any;
    insertOne<T>(collection: string, document: object): any;
}

export { iStorage }