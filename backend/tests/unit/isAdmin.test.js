import { isAdmin } from "../../src/middleware/auth.js";

describe("isAdmin middleware", () => {
  test("bloquea usuarios no admin", () => {
    const req = { user: { role: "USER" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    isAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
