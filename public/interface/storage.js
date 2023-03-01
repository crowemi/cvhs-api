"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iStorageFactory = void 0;
const mongodb_storage_1 = require("../storage/mongodb_storage");
const global_env_1 = require("../global.env");
const iStorageTypes = ["mongodb",];
const iStorageFactory = (type) => {
    console.debug(`iStorageFactory start.`);
    console.debug(`iStorageFactory type ${type}.`);
    if (iStorageTypes.includes(type)) {
        switch (type) {
            case "mongodb": {
                console.debug(`Creating mongodb storage.`);
                return new mongodb_storage_1.MongoStorage(global_env_1.EnvVars.mongodb_uri, global_env_1.EnvVars.mongodb_db);
            }
            default: {
                throw new Error(`${type} is an invalid storage type`);
            }
        }
    }
    else {
        throw new Error(`${type} is an invalid storage type`);
    }
};
exports.iStorageFactory = iStorageFactory;
