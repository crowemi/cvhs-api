export class Log {
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
}