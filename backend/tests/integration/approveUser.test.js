import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest
      .fn()
      .mockResolvedValue({ rows: [{ id: 99, email: "x@x.com" }], rowCount: 1 }),
  },
}));

test("PATCH /api/users/:id/approve", async () => {
  const app = createTestApp();

  const token = jwt.sign({ id: 1, role: "ADMIN" }, "secret");
  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .patch("/api/users/99/approve")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
