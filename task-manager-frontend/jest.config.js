// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest to transform TypeScript files
    "^.+\\.(js|jsx)$": "babel-jest", // Use babel-jest to transform JavaScript files
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy", // Mock CSS imports
  },
  transformIgnorePatterns: [
    "node_modules/(?!axios)/", // Allow Jest to transform axios as an ES module
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ES modules
  globals: {
    "ts-jest": {
      useESM: true, // Enable ESM support for ts-jest
    },
  },
};
