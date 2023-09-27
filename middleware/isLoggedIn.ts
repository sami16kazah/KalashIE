import { Request, Response, NextFunction } from "express";
import { NotAuthourizedError } from "../errors/NotAuthourizeError";
import { BadRequestError } from "../errors/bad_request_error";
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthourizedError("You Are Not Authourized");
  }
  next();
};
