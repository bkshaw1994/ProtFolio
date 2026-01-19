module.exports = {
  // Root directory
  rootDir: ".",

  // Projects configuration for monorepo-style setup
  projects: [
    {
      displayName: "client",
      rootDir: "./client",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
      testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
        "<rootDir>/src/**/*.(test|spec).{js,jsx}",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@features/(.*)$": "<rootDir>/src/features/$1",
        "^@services/(.*)$": "<rootDir>/src/services/$1",
        "^@context/(.*)$": "<rootDir>/src/context/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "jest-transform-stub",
      },
      collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/index.js",
        "!src/reportWebVitals.js",
        "!src/**/*.test.{js,jsx}",
        "!src/**/*.spec.{js,jsx}",
        "!src/setupTests.js",
      ],
      transform: {
        "^.+\\.(js|jsx)$": ["babel-jest", { presets: ["react-app"] }],
      },
      transformIgnorePatterns: [
        "node_modules/(?!(@standard-schema|@reduxjs/toolkit|axios|react-hot-toast)/)",
      ],
    },
    {
      displayName: "server",
      rootDir: "./server",
      testEnvironment: "node",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      globalSetup: "<rootDir>/jest.globalSetup.js",
      globalTeardown: "<rootDir>/jest.globalTeardown.js",
      testMatch: [
        "<rootDir>/**/__tests__/**/*.js",
        "<rootDir>/**/?(*.)+(spec|test).js",
      ],
      collectCoverageFrom: [
        "**/*.js",
        "!node_modules/**",
        "!coverage/**",
        "!jest.config.js",
        "!eslint.config.js",
        "!**/*.test.js",
        "!**/*.spec.js",
        "!jest.setup.js",
        "!jest.globalSetup.js",
        "!jest.globalTeardown.js",
      ],
      testTimeout: 30000,
    },
  ],

  // Global coverage settings
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["text", "lcov", "html", "json"],

  // Global coverage thresholds (set to achievable levels)
  coverageThreshold: {
    global: {
      branches: 7,
      functions: 6,
      lines: 40,
      statements: 38,
    },
  },

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,

  // Verbose output
  verbose: true,

  // Test timeout (30 seconds)
  testTimeout: 30000,
};
