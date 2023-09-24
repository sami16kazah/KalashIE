import mongoose from "mongoose";
const MONGODB_URI = `mongodb://localhost:27017/KalashIS`;

import { app } from "./app";

const start = async () => {
  try {
    await mongoose
      .connect(MONGODB_URI)
      .then((result) => {
        app.listen(process.env.PORT || 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

start();
