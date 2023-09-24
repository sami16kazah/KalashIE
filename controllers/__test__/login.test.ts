import request from "supertest";
import { app } from "../../app";

it("return 201 successfully", async () => {
  await request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
  return await request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test@test.com",
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
      email: "test@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);
  return request(app)
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

it("return 400 Missing email", async () => {
  return request(app)
    .post("/signup")
    .send({
      name: "test",
      password: "12345677",
    })
    .expect(400);
});

it("return 400 Missing password", async () => {
  return request(app)
    .post("/signup")
    .send({
      name: "sami",
      email: "test@test.com",
    })
    .expect(400);
});

it("Incorrect Password 401", async () => {
  await request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);

  return await request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test@test.com",
      password: "WrongPassword",
      phone: "+31-123456789",
    })
    .expect(401);
});
