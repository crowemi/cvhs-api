"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const roster_1 = require("./roster");
class Registry extends roster_1.Roster {
    constructor(firstName, lastName, email) {
        super(firstName, lastName);
        this.Email = email;
    }
}
exports.Registry = Registry;
