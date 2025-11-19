import { validateRegister } from "../../src/middleware/validators.js";
import { validationResult } from "express-validator";

test("validateRegister falla si email es inválido", async () => {
  const req = { body: { name: "AAAAA", email: "bad", password: "12345678" } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  const next = jest.fn();

  for (const validator of validateRegister) {
    await validator(req, res, next);
  }

  const errors = validationResult(req);

  expect(errors.isEmpty()).toBe(false);
});
