import { sanitizeInput } from "../../src/middleware/sanitize.js";

describe("sanitizeInput middleware", () => {
  test("remueve caracteres maliciosos", () => {
    const req = {
      body: { text: "<script>alert(1)</script>" },
      params: {},
      query: {},
    };
    const res = {};
    const next = jest.fn();

    sanitizeInput(req, res, next);

    expect(req.body.text).not.toContain("<script>");
    expect(next).toHaveBeenCalled();
  });
});
