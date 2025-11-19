import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [{ content: "Muy rica" }] }),
  },
}));

test("POST /api/comments/:productId", async () => {
  const app = createTestApp();
  const token = jwt.sign({ id: 1 }, "secret");

  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .post("/api/comments/1")
    .set("Authorization", `Bearer ${token}`)
    .send({ content: "Muy rica" });

  expect(res.status).toBe(201);
});
