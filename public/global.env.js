"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EnvVars {
    static format(envVariable) {
        let ret;
        if (typeof envVariable === undefined) {
            ret = "";
        }
        else {
            ret = envVariable.toString();
        }
        return ret;
    }
}
exports.EnvVars = EnvVars;
_a = EnvVars;
EnvVars.storage_type = _a.format(process.env.STORAGE_TYPE);
EnvVars.mongodb_uri = _a.format(process.env.MONGODB_URI);
EnvVars.mongodb_db = _a.format(process.env.MONGODB_DB);
EnvVars.port = _a.format(process.env.PORT);
