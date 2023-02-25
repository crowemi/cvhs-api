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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_storage_1 = require("./storage/mongodb_storage");
const global_env_1 = require("./global.env");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const port = 3001;
// TODO: create factory for storage
const storageClient = new mongodb_storage_1.MongoStorage(global_env_1.EnvVars.mongodb_uri, "cvhs");
app.post('/registry', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    var incoming = _req.body;
    var filter = {
        "firstName": incoming.firstName,
        "lastName": incoming.lastName
    };
    console.log(filter);
    var document = {
        "firstName": incoming.firstName,
        "lastName": incoming.lastName,
        "email": incoming.email
    };
    console.log(document);
    // 1. check the submitted last name is part of the class
    var roster = yield storageClient.getOne("roster", filter);
    console.log(roster);
    if (roster) {
        // 2. check that they haven't previously registered
        var registry = yield storageClient.getOne("registry", filter);
        if (registry) {
            _res.send("Already registered.");
        }
        else {
            yield storageClient.insertOne("registry", document);
        }
    }
    // 3. add to registry
    _res.send();
}));
// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
