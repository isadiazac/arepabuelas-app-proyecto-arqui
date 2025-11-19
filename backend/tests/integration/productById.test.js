import request from "supertest";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [{ id: 10, name: "Arepa" }] }),
  },
}));

test("GET /api/products/10", async () => {
  const app = createTestApp();
  const res = await request(app).get("/api/products/10");

  expect(res.body.id).toBe(10);
});
