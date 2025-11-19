jest.mock("../src/middleware/uploadUserPhoto.js", () => ({
  uploadUserPhoto: {
    single: () => (req, res, next) => next(),
  },
}));
