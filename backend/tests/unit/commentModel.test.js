import { createComment } from "../../src/models/comment.model.js";

jest.mock("../../src/config/db.js", () => ({
  pool: { query: jest.fn().mockResolvedValue({ rows: [{ content: "Hola" }] }) },
}));

test("createComment funciona", async () => {
  const c = await createComment({ user_id: 1, product_id: 1, content: "Hola" });
  expect(c.content).toBe("Hola");
});
