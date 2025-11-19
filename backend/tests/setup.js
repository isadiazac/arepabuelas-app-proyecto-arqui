// Evitar que dotenv cargue nada
jest.mock("dotenv", () => ({
  config: () => {},
}));

// Mock bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed"),
  compare: jest.fn().mockResolvedValue(true),
}));

// Mock pool.query global
jest.mock("../src/config/db.js", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({ rows: [] }),
  },
}));

// Desactivar auditLogger
jest.mock("../src/middleware/auditLogger.js", () => ({
  auditLogger: () => {},
}));
