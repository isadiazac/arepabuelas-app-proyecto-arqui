import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: { query: jest.fn().mockResolvedValue({ rows: [] }) },
}));

test("GET /api/orders", async () => {
  const app = createTestApp();

  const token = jwt.sign({ id: 1 }, "secret");
  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .get("/api/orders")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
