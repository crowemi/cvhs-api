"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessError = void 0;
const ProcessError = (_res, message, Error) => {
    console.error(message);
    console.error(Error);
    _res.send("Uh oh! Something isn't right. Please try again later.");
};
exports.ProcessError = ProcessError;
