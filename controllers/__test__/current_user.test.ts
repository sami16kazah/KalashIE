import request from "supertest";

import { app } from "../../app";

it("return Detail about auth user ", () => {
  request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test5@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);

  const authResponse = request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test5@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  const response = request(app)
    .get("/currentUser")
    .set("Cookie", cookie)
    .send({})
    .expect(201);

  // ...
});
