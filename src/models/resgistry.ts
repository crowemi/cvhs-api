import { Roster } from './roster'

export class Registry extends Roster {
    public Email: string;
    constructor(firstName: string, lastName: string, email: string) {
        super(firstName, lastName);
        this.Email = email
    }
}