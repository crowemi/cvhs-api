import { ObjectId } from "mongodb";

interface iModel {
    _id: any;
    _type: string;

    created: Date;
    updated: Date;
}

export { iModel }