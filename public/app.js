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
const storage_1 = require("./interface/storage");
const resgistry_1 = require("./models/resgistry");
const global_env_1 = require("./global.env");
const helpers_1 = require("./helpers");
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
const port = Number(global_env_1.EnvVars.port);
const storageClient = (0, storage_1.iStorageFactory)(global_env_1.EnvVars.storage_type);
app.get('/health', (_req, _res) => {
    _res.send(true);
});
app.get('/metrics', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    var registryCount = yield storageClient.getMetrics("registry", "count");
    console.debug(registryCount);
    return _res.send({ code: 200, metrics: { registryCount: registryCount } });
}));
app.get('/registry/:id', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = _req.params.id;
    console.log(id);
    var registry = yield storageClient.getOne("registry", { _id: new mongodb_1.ObjectId(id) });
    console.log(registry);
    return _res.send({ code: 200, payload: { registry: registry } });
}));
app.post('/registry', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    var incoming = _req.body;
    console.log(incoming);
    var registry = new resgistry_1.Registry(incoming.firstName, incoming.lastName, incoming.email);
    console.log(registry);
    try {
        // 1. check the submitted last name is part of the roster
        var roster = yield storageClient.get("roster", { '$text': { "$search": `${incoming.firstName} ${incoming.lastName}` } });
        roster.forEach((r) => {
            // make sure that the first names match
            if (r.firstName.toLowerCase() == incoming.firstName.toLowerCase() && r.lastName.toLocaleLowerCase() == incoming.lastName.toLowerCase()) {
                roster = r;
                console.debug("First/Last Name match.");
            }
            else {
                roster = null;
                console.debug("First/Last Name mismatch.");
            }
        });
        console.log(roster);
    }
    catch (Error) {
        (0, helpers_1.ProcessError)(_res, `Failed to retreive roster for ${incoming.firstName} ${incoming.lastName}`, Error);
    }
    if (roster && roster._id) {
        // 2. check that they haven't previously registered
        if (roster.data) {
            console.debug(`${registry.firstName} ${registry.lastName} already registered.`);
            return _res.send({ code: 202, message: "Already registered." });
        }
        else {
            try {
                // 3. add to registry
                var insert = yield storageClient.insertOne("registry", registry);
                console.debug(insert);
                var res = `${registry.firstName} ${registry.lastName} registered successfully.`;
                console.debug(res);
                // 4. update roster with timestamp
                var data = {
                    registryID: insert.insertedId,
                    incoming: incoming
                };
                console.debug(data);
                var update = yield storageClient.updateOne("roster", { _id: new mongodb_1.ObjectId(roster._id) }, { $set: { data: data } });
                console.debug(update);
                return _res.send({ code: 200, payload: { id: insert.insertedId, message: res } });
            }
            catch (Error) {
                (0, helpers_1.ProcessError)(_res, `Failed to insert registry for ${incoming.lastName}`, Error);
            }
        }
    }
    else {
        var res = `${incoming.firstName} ${incoming.lastName} not part of roster.`;
        return _res.send({ code: 202, payload: { message: res } });
    }
}));
app.post('/log', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// Server setup
app.listen(port, () => { });
