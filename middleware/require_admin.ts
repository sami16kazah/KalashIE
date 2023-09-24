import { Request, Response, NextFunction } from "express";
import { NotAuthourizedError } from "../errors/NotAuthourizeError";
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthourizedError("You Are Not Authourized");
  }
  if (req.currentUser && req.currentUser.role !== "admin") {
    throw new NotAuthourizedError("You Are Not Authourized");
  }
  next();
};
