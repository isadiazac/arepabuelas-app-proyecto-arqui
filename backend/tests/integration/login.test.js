import request from "supertest";
import { createTestApp } from "./setupApp.js";
import { pool } from "../../src/config/db.js";

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("login exitoso", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          email: "isa@test.com",
          name: "Isa",
          password_hash:
            "$2b$10$aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          status: "active",
          is_admin: false,
        },
      ],
    });

    const app = createTestApp();

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "isa@test.com", password: "123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
