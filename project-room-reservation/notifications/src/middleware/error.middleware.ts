import {ApiError} from "../types/api.error";
import {NextFunction, Request, Response} from "express";

export const apiErrorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status: err.name || 'error',
            message: err.message
        });
        return
    }
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "Internal Server Error, see server logs in console"
    });
    return;
};