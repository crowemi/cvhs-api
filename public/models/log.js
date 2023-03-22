"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
    constructor(message, severity, source, created_at, ip) {
        this.date = new Date(Date.now());
        this.message = message;
        this.severity = severity;
        this.source = source;
        this.created_at = created_at;
        this.ip = ip;
    }
}
exports.Log = Log;
