import { Response } from "express";

const ProcessError = (_res: Response, message: string, Error: any): void => {
    console.error(message);
    console.error(Error);
    _res.send("Uh oh! Something isn't right. Please try again later.")
}

export { ProcessError }