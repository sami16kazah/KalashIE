import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { errorHandler } from "./middleware/error-handler";
import { router } from "./routes/router";
import cookieSession from "cookie-session";

const app = express();
//app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    // signed false to https only
    // signed : false,
    secret: "some key secret",
    maxAge: 604800000, // one week before expire
  })
);
app.use(router);
app.use(errorHandler);

export { app };
