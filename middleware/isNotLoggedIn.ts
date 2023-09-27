import { Request, Response, NextFunction } from "express";
export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser && req.currentUser.role) {
    return res.redirect("/currentUser");
  }

  next();
};
