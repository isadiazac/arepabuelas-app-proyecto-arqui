import request from "supertest";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [{ id: 1, name: "Arepa" }] }),
  },
}));

test("GET /api/products", async () => {
  const app = createTestApp();
  const res = await request(app).get("/api/products");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
