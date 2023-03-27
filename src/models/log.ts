import { iStorage } from "../interface/storage";

enum LogSeverity {
    DEBUG = "debug",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}

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

    static logError(storageClient: iStorage, message: string, source: string, ip: string) { this.processLog(storageClient, message, LogSeverity.ERROR, source, ip); }
    static logInfo(storageClient: iStorage, message: string, source: string, ip: string) { this.processLog(storageClient, message, LogSeverity.INFO, source, ip); }
    static logWarning(storageClient: iStorage, message: string, source: string, ip: string) { this.processLog(storageClient, message, LogSeverity.WARNING, source, ip); }
    static logDebug(storageClient: iStorage, message: string, source: string, ip: string) { this.processLog(storageClient, message, LogSeverity.DEBUG, source, ip); }
    static processLog(storageClient: iStorage, message: string, severity: string, source: string, ip: string) {
        try {
            var log: Log = {
                date: new Date(Date.now()),
                message: message,
                severity: severity,
                source: source,
                ip: ip,
                created_at: new Date(Date.now()).toISOString()
            }
            storageClient.insertOne<Log>("log", log);
        } catch (error) {
            console.error("Failed logging Log.processLog().");
            console.error(Error);
        }
    }

}


export { Log, LogSeverity }