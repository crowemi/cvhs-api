import dotenv from "dotenv";
dotenv.config();

export abstract class EnvVars {
    public static storage_type: string = this.format(process.env.STORAGE_TYPE);
    public static mongodb_uri: string = this.format(process.env.MONGODB_URI);
    public static mongodb_db: string = this.format(process.env.MONGODB_DB);
    public static port: string = this.format(process.env.PORT);
    public static aws_access_key: string = this.format(process.env.AWS_ACCESS_KEY);
    public static aws_secret_access_key: string = this.format(process.env.AWS_SECRET_ACCESS_KEY);

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