"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roster = void 0;
class Roster {
    constructor(firstName, lastName, updated = null, rosterData = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.data = rosterData;
        this.updated = updated;
    }
}
exports.Roster = Roster;
