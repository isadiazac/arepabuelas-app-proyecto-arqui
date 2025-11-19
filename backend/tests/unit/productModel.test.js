import { getProductById } from "../../src/models/product.model.js";

jest.mock("../../src/config/db.js", () => ({
  pool: { query: jest.fn().mockResolvedValue({ rows: [{ id: 99 }] }) },
}));

test("getProductById retorna producto", async () => {
  const p = await getProductById(99);
  expect(p.id).toBe(99);
});
