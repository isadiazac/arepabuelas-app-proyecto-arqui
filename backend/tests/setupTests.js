// 1. Mock de uploadUserPhoto ANTES de importar nada
jest.mock("../src/middleware/uploadUserPhoto.js", () => ({
  uploadUserPhoto: {
    single: () => (req, res, next) => next(),
  },
}));

// 2. Variables del entorno para pruebas (JWT)
process.env.JWT_SECRET = "testsecret123";
process.env.NODE_ENV = "test";
