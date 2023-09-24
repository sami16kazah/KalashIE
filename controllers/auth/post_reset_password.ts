import { DataBaseConnectionError } from "../../errors/database_connection_error";
import { BadRequestError } from "../../errors/bad_request_error";
import { Request, Response, NextFunction } from "express";
import { User, buildNewUser } from "../../model/user";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtKey = "this is json web token key";

export const forgetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  randomBytes(32, async (err, buffer) => {
    if (err) {
      throw new BadRequestError("Something bad just happend buf !");
    }
    const token = buffer.toString("hex");
    await User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          throw new BadRequestError("There is no user by this email !");
        }
        user.resetToken = token;
        user.resetTokenExpiration = new Date(Date.now() + 3600000);
        user.save();
      })
      .catch((err) => {
        throw new BadRequestError("There is no user by this email !");
      });
    res.send({ token: token });
  });
};

export const postChangePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, password } = req.body;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then(async (user) => {
      if (!user) {
        throw new BadRequestError(
          "there is no user with the requeted reset token "
        );
      }

      const hashpassword = await hash(password, 8);
      user.password = hashpassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      res
        .status(201)
        .send({ message: "password has been updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
