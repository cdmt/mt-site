const nextJest = require("next/jest");

// next/jest loads next.config.ts, where withFontdue needs a Fontdue URL.
process.env.NEXT_PUBLIC_FONTDUE_URL ??= "https://example.fontdue.com/";

const createJestConfig = nextJest({
    dir: "./",
});

const config = {
    clearMocks: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^fontdue-js/TypeTester$": "<rootDir>/src/test/mocks/TypeTesterMock.tsx",
        "^fontdue-js/useFontStyle$": "<rootDir>/src/test/mocks/useFontStyleMock.js",
        "^fontdue-js/server$": "<rootDir>/src/test/mocks/fontdueServerMock.ts",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jsdom",
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

module.exports = createJestConfig(config);
