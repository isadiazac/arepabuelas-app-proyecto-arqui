module.exports = {
  testEnvironment: "node",
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",
};
