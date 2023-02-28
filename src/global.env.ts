import dotenv from "dotenv";
dotenv.config();

export abstract class EnvVars {
    public static storage_type: string = this.format(process.env.STORAGE_TYPE);
    public static mongodb_uri: string = this.format(process.env.MONGODB_URI);
    public static mongodb_db: string = this.format(process.env.MONGODB_DB);

    static format(envVariable: any): string {
        let ret: string;
        if (typeof envVariable === undefined) {
            ret = ""
        } else {
            ret = envVariable.toString();
        }

        return ret;
    }
}