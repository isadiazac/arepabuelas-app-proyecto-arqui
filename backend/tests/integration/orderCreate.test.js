import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest
      .fn()
      .mockResolvedValueOnce({ rows: [] }) // no hay compras antes
      .mockResolvedValueOnce({ rows: [{ id: 777 }] }) // nueva orden
      .mockResolvedValue({}), // insertar items
  },
}));

test("POST /api/orders crea orden", async () => {
  const app = createTestApp();

  const token = jwt.sign({ id: 1 }, "secret");
  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .post("/api/orders")
    .set("Authorization", `Bearer ${token}`)
    .send({
      products: [{ product_id: 1, quantity: 1, price: 1000 }],
      totalAmount: 1000,
    });

  expect(res.status).toBe(201);
});
