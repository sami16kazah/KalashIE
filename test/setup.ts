import mongoose, { Mongoose, ConnectOptions } from "mongoose";
import { app } from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

let mongo: any;
beforeAll(async () => {
  request(app).get("/").set("Cookie", "");
  mongo = new MongoMemoryServer();
  const MONGODB_URI = `mongodb://localhost:27017/KalashIS-Test`;
  await mongoose.connect(MONGODB_URI);
});

beforeEach(async () => {
  request(app).get("/").set("Cookie", "");
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterEach(async () => {
  request(app).get("/").set("Cookie", "");
});

afterAll(async () => {
  request(app).get("/").set("Cookie", "");
  await mongo.stop();
  await mongoose.connection.close();
});
