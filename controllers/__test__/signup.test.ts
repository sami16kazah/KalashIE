import request from "supertest";
import { app } from "../../app";

it("return 201 successfully", async () => {
  return request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
});

it("return 400 invalid email", async () => {
  return request(app)
    .post("/signup")
    .send({
      email: "testtest.com",
      password: "passwor",
    })
    .expect(400);
});

it("return 400 invalid password", async () => {
  return request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "123",
    })
    .expect(400);
});

it("return 400 Missing name", async () => {
  return request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "12345677",
    })
    .expect(400);
});

it("return 400 Missing phone", async () => {
  return request(app)
    .post("/signup")
    .send({
      name: "sami",
      email: "test@test.com",
      password: "12345677",
    })
    .expect(400);
});

it("return 400 invalid phone less than 9 numbers", async () => {
  return request(app)
    .post("/signup")
    .send({
      name: "sami",
      email: "test@test.com",
      password: "12345677",
      phone: "+31-12345678",
    })
    .expect(400);
});
