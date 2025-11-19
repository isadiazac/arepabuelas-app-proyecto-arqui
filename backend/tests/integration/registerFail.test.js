import request from "supertest";
import { createTestApp } from "./setupApp.js";

describe("POST /api/auth/register", () => {
  test("falla sin foto", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/auth/register")
      .field("name", "Isa")
      .field("email", "i@i.com")
      .field("password", "123456");

    expect(res.status).toBe(400);
  });
});
