"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
class Registry {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.created = new Date(Date.now()).toISOString();
        this.updated = new Date(Date.now()).toISOString();
    }
}
exports.Registry = Registry;
