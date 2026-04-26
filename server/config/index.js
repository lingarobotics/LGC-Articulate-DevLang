// server/config/index.js

require('dotenv').config();

const { evaluationPrompt, doubtPrompt } = require('./aiPrompt');

const config = {
  // ============================================
  // SERVER
  // ============================================
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // ============================================
  // DATABASE
  // ============================================
  mongoUri:
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/lgc-articulate-devlang',

  // ============================================
  // API
  // ============================================
  apiPrefix: process.env.API_PREFIX || '/api',

  // ============================================
  // CORS (FIXED)
  // ============================================
  corsOrigin:
    process.env.CORS_ORIGIN ||
    (process.env.NODE_ENV === 'production'
      ? 'https://yourdomain.com'
      : 'http://localhost:5173'),

  // ============================================
  // RATE LIMIT
  // ============================================
  rateLimitWindowMs:
    parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,

  rateLimitMaxRequests:
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // ============================================
  // SECURITY
  // ============================================
  jwtSecret:
    process.env.JWT_SECRET || 'dev-secret-change-in-production',

  jwtExpiration:
    process.env.JWT_EXPIRATION || '7d',

  // ============================================
  // FEATURES
  // ============================================
  enableAnalytics: process.env.ENABLE_ANALYTICS !== 'false',
  enableTestEndpoint: process.env.ENABLE_TEST_ENDPOINT !== 'false',

  // ============================================
  // AI CONFIG (CONSISTENT)
  // ============================================
  ai: {
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.4,
    maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 300,
    timeout: parseInt(process.env.AI_TIMEOUT) || 5000,
    model:
      process.env.AI_MODEL_EVALUATION ||
      process.env.AI_MODEL ||
      'openai/gpt-4.1-mini'
  },

  // ============================================
  // PROMPTS
  // ============================================
  evaluationPrompt,
  doubtPrompt
};

/**
 * Validate required configuration
 */
function validateConfig() {
  const errors = [];

  if (config.nodeEnv === 'production') {
    if (!process.env.MONGO_URI) {
      errors.push('MONGO_URI must be set in production');
    }

    if (config.jwtSecret === 'dev-secret-change-in-production') {
      errors.push('JWT_SECRET must be set in production');
    }

    if (!process.env.OPENROUTER_API_KEY) {
      errors.push('OPENROUTER_API_KEY must be set in production');
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Configuration validation failed:\n${errors.join('\n')}`
    );
  }

  return true;
}

module.exports = {
  ...config,
  validateConfig
};