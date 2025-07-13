import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts", // penting untuk setup jsx dan ts sekaligus
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json",
    },
  },
};

export default config;
