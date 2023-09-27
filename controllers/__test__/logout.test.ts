import request from "supertest";
import { app } from "../../app";

it("clears the cookie after logging out", () => {
  request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test6@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);

  const authResponse = request(app)
    .post("/login")
    .send({
      name: "test",
      email: "test6@test.com",
      password: "password12",
      phone: "+31-123456789",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");
  const response = request(app)
    .post("/logout")
    .set("Cookie", cookie)
    .send({})
    .expect(200);
});
