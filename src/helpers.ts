import { Response } from "express";

type Ret = {
    code: number,
    payload: {}
}

const ProcessError = (_res: Response, message: string, Error: any): void => {
    console.error(message);
    console.error(Error);
    _res.send({ code: 500, message: "Uh oh! Something isn't right. Please try again later." })
}

export { ProcessError }