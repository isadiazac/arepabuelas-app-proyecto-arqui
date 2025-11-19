import { createUser } from "../../src/models/user.model.js";

jest.mock("../../src/config/db.js", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [{ email: "test@test.com" }] }),
  },
}));

test("createUser crea usuario", async () => {
  const user = await createUser("Isa", "test@test.com", "hash", null);
  expect(user.email).toBe("test@test.com");
});
