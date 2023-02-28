import { Roster } from './roster'

export class Registry {
    public firstName: string;
    public lastName: string;
    public email: string;
    public created: number;
    public updated: number;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.created = Date.now();
        this.updated = Date.now();
    }
}