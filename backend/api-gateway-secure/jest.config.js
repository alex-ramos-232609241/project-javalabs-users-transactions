module.exports = {
    testTimeout: 10010,
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.js",
      "!src/**/*.test.js"
    ],
    coverageReporters: ["text", "lcov"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };