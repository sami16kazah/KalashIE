import mongoose, { Mongoose, ConnectOptions } from "mongoose";
import { app } from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const MONGODB_URI = `mongodb://localhost:27017/KalashIS`;
  await mongoose.connect(MONGODB_URI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
