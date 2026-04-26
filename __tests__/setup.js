/**
 * Jest Test Setup
 * Runs before all tests
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost:27017/lgc-articulate-test';
process.env.JWT_SECRET = 'test-secret';
process.env.ENABLE_TEST_ENDPOINT = 'true';
process.env.API_PREFIX = '/api';
process.env.CORS_ORIGIN = 'http://localhost:5173';
process.env.JWT_EXPIRATION = '1h';

// AI-related defaults to keep test boot deterministic
process.env.AI_TIMEOUT = '1000';
process.env.AI_MAX_TOKENS = '100';
process.env.AI_TEMPERATURE = '0.1';

// Suppress console output during tests (optional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
// };

beforeEach(() => {
  jest.clearAllMocks();
});
