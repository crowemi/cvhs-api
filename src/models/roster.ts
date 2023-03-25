import { ObjectId } from "mongodb";
import { iModel } from "../interface/model";

type RosterData = {
    registryID: any | null,
    incoming: object,
}

class Roster implements iModel {
    public _id!: ObjectId;
    public _type: string = "roster";

    public created!: Date;
    public updated: Date;

    public firstName: string;
    public lastName: string;
    public data: RosterData | null;

    constructor(
        firstName: string,
        lastName: string,
        updated: Date,
        rosterData: RosterData | null = null,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.data = rosterData;
        this.updated = updated;
    }

}

export { Roster, RosterData }