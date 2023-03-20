type RosterData = {
    registryID: any | null,
    incoming: object,
}

class Roster {
    public firstName: string;
    public lastName: string;
    public data: RosterData | null;
    public updated: string | null;

    constructor(
        firstName: string,
        lastName: string,
        updated: string | null = null,
        rosterData: RosterData | null = null,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.data = rosterData;
        this.updated = updated;
    }

}

export { Roster, RosterData }