import { Request, Response, NextFunction } from "express";
import { CustomErrors } from "../errors/custom_errors";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomErrors) {
    return res.status(err.statusCode).send({ errors: err.serilizeErrors() });
  }
};
