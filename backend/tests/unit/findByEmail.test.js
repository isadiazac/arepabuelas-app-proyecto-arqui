import { findByEmail } from "../../src/models/user.model.js";

jest.mock("../../src/config/db.js", () => ({
  pool: { query: jest.fn().mockResolvedValue({ rows: [{ id: 1 }] }) },
}));

test("findByEmail retorna usuario", async () => {
  const u = await findByEmail("a@b.com");
  expect(u.id).toBe(1);
});
