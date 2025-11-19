import request from "supertest";
import jwt from "jsonwebtoken";
import { createTestApp } from "./setupApp.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest
      .fn()
      .mockResolvedValueOnce({ rows: [{ id: 1, is_paid: false }] })
      .mockResolvedValueOnce({ rows: [{ id: 1, is_paid: true }] }),
  },
}));

test("POST /api/orders/pay", async () => {
  const app = createTestApp();
  const token = jwt.sign({ id: 1 }, "secret");
  process.env.JWT_SECRET = "secret";

  const res = await request(app)
    .post("/api/orders/pay")
    .set("Authorization", `Bearer ${token}`)
    .send({
      orderId: 1,
      paymentDetails: {
        cardNumber: "4242",
        cvv: "123",
        expiryMonth: "12",
        expiryYear: "2030",
      },
    });

  expect(res.status).toBe(200);
});
