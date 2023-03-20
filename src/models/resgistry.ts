import { Roster } from './roster'

export class Registry {
    public firstName: string;
    public lastName: string;
    public email: string;
    public created: string;
    public updated: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.created = new Date(Date.now()).toISOString();
        this.updated = new Date(Date.now()).toISOString();
    }
}