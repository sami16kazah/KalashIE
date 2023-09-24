import { DataBaseConnectionError } from "../../errors/database_connection_error";
import { BadRequestError } from "../../errors/bad_request_error";
import { Request, Response, NextFunction } from "express";
import { User, buildNewUser } from "../../model/user";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtKey = "this is json web token key";

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new BadRequestError("The Requested Email Is In Use !");
  }
  const hashpassword = await hash(password, 8);
  randomBytes(32, async (err, buffer) => {
    if (err) {
      throw new BadRequestError("Something bad just happend buf !");
    }

    const token = buffer.toString("hex");
    const newUser = buildNewUser({
      name,
      email,
      password: hashpassword,
      phone,
      verifiedToken: token,
      role: "user",
    });
    await newUser.save();
    //generate jwt
    const UserJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        token: token,
      },
      jwtKey
    );
    // store jwt on session
    req.session = {
      jwt: UserJwt,
    };
    res.status(201).send([{ jwt: UserJwt }, { user: newUser }]);
  });
};
