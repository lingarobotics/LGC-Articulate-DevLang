module.exports = {
  // 🧪 Test Environment
  testEnvironment: 'node',

  // 📂 Root directory
  rootDir: '..',

  // 🔍 Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],

  // 📊 Coverage collection (aligned with your structure)
  collectCoverageFrom: [
    'server/controllers/**/*.js',
    'server/services/**/*.js',
    'server/models/**/*.js',
    'server/middleware/**/*.js',
    'server/utils/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],

  // 📈 Coverage thresholds (realistic but meaningful)
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 65,
      lines: 70,
      statements: 70
    }
  },

  // ⚙️ Setup file (only if exists)
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],

  // 📦 Module resolution
  moduleDirectories: ['node_modules', '<rootDir>/server/node_modules', '<rootDir>'],

  // 🧹 Clean mocks between tests
  clearMocks: true,

  // ⏱️ Timeout for async tests
  testTimeout: 10000,

  // 📣 Better output
  verbose: true,

  // 🚫 Ignore unnecessary paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/client/'
  ],

  // 📁 Coverage output
  coverageDirectory: 'coverage',

  // 📄 Coverage reporters
  coverageReporters: ['text', 'lcov', 'html']
};
