import { ObjectId } from "mongodb";
import { iModel } from "../interface/model"

export class Registry implements iModel {
    public _id!: any;
    public _type: string = 'registry';

    public created: Date;
    public updated: Date;

    public firstName: string;
    public lastName: string;
    public email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        var creationDate = new Date();
        this.created = creationDate;
        this.updated = creationDate;
    }

    public confirmEmailEndpoint = (): string => {
        return `/confirm-email/${this._id}`;
    }
}