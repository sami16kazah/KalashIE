import { DataBaseConnectionError } from "../../errors/database_connection_error";
import { BadRequestError } from "../../errors/bad_request_error";
import { NotAuthourizedError } from "../../errors/NotAuthourizeError";
import { Request, Response, NextFunction } from "express";
import { User } from "../../model/user";
import jwt from "jsonwebtoken";
const jwtKey = "this is json web token key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  User.findOne({ verifiedToken: token })
    .then((newUser) => {
      if (!newUser) {
        throw new BadRequestError("User is not found");
      }

      newUser.verifiedToken = undefined;
      newUser.save();

      res.status(201).send([{ message: "user verified successfully !" }]);
    })
    .catch((err) => {
      next(err);
    });
};

interface UserPayload {
  id: string;
  email: string;
  token: string;
}

export const resendToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    throw new NotAuthourizedError("You Need to have a cockie to resend");
  }
  try {
    const payload = jwt.verify(req.session.jwt, jwtKey) as UserPayload;
    if (payload.token) {
      return res.status(201).send({ token: payload.token });
    }
    return res.status(401).send({ message: "Invalid JWT token." });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Invalid JWT token." });
  }
};
