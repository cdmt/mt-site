const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const config = {
    clearMocks: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^fontdue-js/TypeTester$": "<rootDir>/src/test/mocks/TypeTesterMock.tsx",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jsdom",
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

module.exports = createJestConfig(config);
