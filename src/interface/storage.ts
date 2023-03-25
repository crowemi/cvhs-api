import { MongoStorage } from "../storage/mongodb_storage";
import { EnvVars } from '../global.env'

interface iStorage {
    client: any;
    // TODO: these method parameters need to be more generic
    getOne<T>(collection: string, filter: object): any;
    get<T>(collection: string, filter: object): any;
    insertOne<T>(collection: string, document: object): any;
    updateOne<T>(collection: string, filter: object, options: object): any;
    getMetrics<T>(collection: string, metric: string): any;
}

enum iStorageType { "mongodb" }

const iStorageFactory = (type: iStorageType): iStorage => {
    console.debug(`iStorageFactory start.`)
    console.debug(`iStorageFactory type ${type}.`)
    switch (type) {
        case iStorageType.mongodb: {
            console.debug(`Creating mongodb storage.`)
            return new MongoStorage(EnvVars.mongodb_uri, EnvVars.mongodb_db)
        }
        default: {
            throw new Error(`${type} is an invalid storage type`)
        }
    }
}

export { iStorage, iStorageFactory, iStorageType }