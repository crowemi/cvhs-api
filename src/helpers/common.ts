import { Response } from "express";

const HealthCheck = (): Boolean => {
    return true;
}

const ProcessError = (_res: Response, message: string, Error: any): void => {
    console.error(message);
    console.error(Error);
    _res.send({ code: 500, message: "Uh oh! Something isn't right. Please try again later." })
}

const ProcessLog = (message: string) => { }


export { ProcessError, HealthCheck }