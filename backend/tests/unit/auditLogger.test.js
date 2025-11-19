import fs from "fs";
import { auditLogger } from "../../src/middleware/auditLogger.js";

jest.mock("fs");

test("auditLogger escribe en archivo", () => {
  auditLogger("TEST_EVENT", { id: 1 });

  expect(fs.appendFileSync).toHaveBeenCalled();
});
