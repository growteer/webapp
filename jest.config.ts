import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.[tj]s?(x)"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/reports/coverage",
  coverageReporters: ["text", "lcov"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "<rootDir>/reports",
        outputName: "test-results.xml",
        addFileAttribute: "true",
        ancestorSeparator: " › ",
      },
    ],
  ],
};

export default createJestConfig(config);
