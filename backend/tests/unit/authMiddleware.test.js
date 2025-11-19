import jwt from "jsonwebtoken";
import { authMiddleware } from "../../src/middleware/auth.js";

const TEST_SECRET = "test_secret";

describe("authMiddleware", () => {
  test("permite acceso con token válido", () => {
    const token = jwt.sign({ id: 1, role: "USER" }, TEST_SECRET);

    process.env.JWT_SECRET = TEST_SECRET;

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.user.id).toBe(1);
    expect(next).toHaveBeenCalled();
  });
});
