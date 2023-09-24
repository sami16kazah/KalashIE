import { DataBaseConnectionError } from "../../errors/database_connection_error";
import { BadRequestError } from "../../errors/bad_request_error";
import { NotAuthourizedError } from "../../errors/NotAuthourizeError";
import { Request, Response, NextFunction } from "express";
import { User } from "../../model/user";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtKey = "this is json web token key";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new NotAuthourizedError("This Email Is Is Not Registred !");
    return;
  }
  if (findUser.verifiedToken) {
    const UserJwt = jwt.sign(
      {
        id: findUser.id,
        email: findUser.email,
        token: findUser.verifiedToken,
        role: findUser.role,
      },
      jwtKey
    );
    // store jwt on session
    req.session = { jwt: UserJwt };
    res.status(201).send([{ message: "Verify your account please !" }]);
    return;
  }
  compare(password, findUser.password)
    .then((doMatch) => {
      if (!doMatch) {
        next(new BadRequestError("Uncorrect Password Try Again !"));
        return;
      }

      const UserJwt = jwt.sign(
        { id: findUser.id, email: findUser.email, role: findUser.role },
        jwtKey
      );

      // store jwt on session
      req.session = { jwt: UserJwt };

      res.status(201).send(findUser);
    })
    .catch((err) => {
      console.log(err);
    });
};
