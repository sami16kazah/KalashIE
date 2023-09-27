import { Request, Response, NextFunction } from "express";

export const postLogOut = (req: Request, res: Response, next: NextFunction) => {
  req.session = null;
  res.status(200).send({ message: "User Logged out" });
};
