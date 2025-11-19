jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import request from "supertest";
import { createTestApp } from "./setupApp.js";
import { pool } from "../../src/config/db.js";
import crypto from "crypto";

function hashPasswordForTest(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return `${salt}$${hash}`;
}

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("login exitoso", async () => {
    const validHash = hashPasswordForTest("123");

    // Consulta #1 → usuario encontrado
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          email: "isa@test.com",
          name: "Isa",
          password_hash: validHash,
          status: "active",
          is_admin: false,
        },
      ],
      rowCount: 1,
    });

    // Consulta #2 → update last_login
    pool.query.mockResolvedValueOnce({ rows: [], rowCount: 1 });

    const app = createTestApp();

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "isa@test.com", password: "123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
