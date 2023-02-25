import { MongoStorage } from "../storage/mongodb_storage";
import { EnvVars } from '../global.env'

interface iStorage {
    client: any;
    // TODO: these method parameters need to be more generic
    getOne<T>(collection: string, filter: object): any;
    insertOne<T>(collection: string, document: object): any;
}

const iStorageTypes = ["mongodb",]

const iStorageFactory = (type: string): iStorage => {
    console.debug(`iStorageFactory start.`)
    console.debug(`iStorageFactory type ${type}.`)
    if (iStorageTypes.includes(type)) {
        switch (type) {
            case "mongodb": {
                console.debug(`Creating mongodb storage.`)
                return new MongoStorage(EnvVars.mongodb_uri, EnvVars.mongodb_db)
            }
            default: {
                throw new Error(`${type} is an invalid storage type`)
            }
        }
    } else {
        throw new Error(`${type} is an invalid storage type`)
    }
}

export { iStorage, iStorageFactory }