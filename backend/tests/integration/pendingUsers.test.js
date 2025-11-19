import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: { query: jest.fn().mockResolvedValue({ rows: [] }) },
}));

test("GET /api/users/pending", async () => {
  const app = createTestApp();

  const token = jwt.sign({ id: 1, role: "ADMIN" }, "secret");
  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .get("/api/users/pending")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
