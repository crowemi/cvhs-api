import { iStorage } from "../interface/storage";

class Log {
    public date: Date;
    public message: string;
    public severity: string;
    public source: string;
    public created_at: string;
    public ip: string;

    constructor(message: string, severity: string, source: string, created_at: string, ip: string) {
        this.date = new Date(Date.now());
        this.message = message;
        this.severity = severity;
        this.source = source;
        this.created_at = created_at;
        this.ip = ip;
    }

    static processLog(storageClient: iStorage, message: string, severity: string, source: string, ip: string) {
        var log: Log = {
            date: new Date(Date.now()),
            message: message,
            severity: severity,
            source: source,
            ip: ip,
            created_at: new Date(Date.now()).toISOString()
        }
        storageClient.insertOne<Log>("log", log);
    }

}


export { Log }