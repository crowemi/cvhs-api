import dotenv from "dotenv";
dotenv.config();

export abstract class EnvVars {
    public static mongodb_uri: string = this.format(process.env.MONGODB_URI);

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