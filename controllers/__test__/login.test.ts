import request from "supertest";

import { app } from "../../app";

it("return 201 successfully", () => {
  request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test1@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
  request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test1@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
});

it("return 401 not registered email", async () => {
  request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test2@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
  request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test1@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(401);
});

it("return 400 invalid email", async () => {
  request(app)
    .post("/login")
    .send({
      email: "testtest.com",
      password: "passwor",
    })
    .expect(400);
});

it("return 400 invalid password", async () => {
  request(app)
    .post("/login")
    .send({
      email: "test@test.com",
      password: "123",
    })
    .expect(400);
});

it("return 400 Missing email", async () => {
  return request(app)
    .post("/login")
    .send({
      name: "test",
      password: "12345677",
    })
    .expect(400);
});

it("return 400 Missing password", async () => {
  request(app)
    .post("/login")
    .send({
      name: "sami",
      email: "test@test.com",
    })
    .expect(400);
});

it("Incorrect Password 401", () => {
  const response = request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test4@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
  expect(response.get("Set-Cookie"));

  request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test4@test.com",
      password: "WrongPassword",
      phone: "+31-123456789",
    })
    .expect(201);
});
