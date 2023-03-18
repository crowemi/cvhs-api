"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoStorage = void 0;
const mongodb_1 = require("mongodb");
class MongoStorage {
    constructor(uri, database) {
        const options = {
            serverApi: mongodb_1.ServerApiVersion.v1,
        };
        this.client = new mongodb_1.MongoClient(uri, options);
        this.database = this.client.db(database);
    }
    getOne(collection, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var col = this.database.collection(collection);
            var ret = yield col.findOne(filter);
            return ret;
        });
    }
    get(collection, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var col = this.database.collection(collection);
            var ret = yield col.find(filter).toArray();
            return ret;
        });
    }
    insertOne(collection, document) {
        return __awaiter(this, void 0, void 0, function* () {
            var col = this.database.collection(collection);
            var ret = yield col.insertOne(document);
            return ret;
        });
    }
    updateOne(collection, filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var col = this.database.collection(collection);
            var ret = yield col.updateOne(filter, options);
            return ret;
        });
    }
    getMetrics(collection, metric) {
        return __awaiter(this, void 0, void 0, function* () {
            var col = this.database.collection(collection);
            var ret = yield col.countDocuments();
            return ret;
        });
    }
}
exports.MongoStorage = MongoStorage;
