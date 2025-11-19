import { verifyToken } from "../../src/middleware/auth.js";

describe("verifyToken", () => {
  test("rechaza si no hay token", () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
