require('dotenv').config();

const { evaluationPrompt, doubtPrompt } = require('./aiPrompt');

const config = {
  // SERVER
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // DATABASE
  mongoUri: process.env.MONGO_URI,

  // API
  apiPrefix: process.env.API_PREFIX || '/api',

  // CORS
  corsOrigin:
    process.env.CORS_ORIGIN ||
    process.env.CLIENT_URL ||
    'http://localhost:5173',

  // RATE LIMIT
  rateLimitWindowMs:
    parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,

  rateLimitMaxRequests:
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // SECURITY
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION || '7d',

  // FEATURES
  enableAnalytics: process.env.ENABLE_ANALYTICS !== 'false',
  enableTestEndpoint: process.env.ENABLE_TEST_ENDPOINT !== 'false',

  // AI CONFIG
  ai: {
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.4,
    maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 300,
    timeout: parseInt(process.env.AI_TIMEOUT) || 25000,
    model:
      process.env.AI_MODEL_EVALUATION ||
      process.env.AI_MODEL ||
      'openai/gpt-4.1-mini'
  },

  // PROMPTS
  evaluationPrompt,
  doubtPrompt
};

// VALIDATION
function validateConfig() {
  const errors = [];

  if (config.nodeEnv === 'production') {
    if (!config.mongoUri) {
      errors.push('MONGO_URI must be set in production');
    }

    if (!config.jwtSecret) {
      errors.push('JWT_SECRET must be set in production');
    }

    if (
      !process.env.OPENROUTER_API_KEY &&
      !process.env.OPENROUTER_API_KEY_ONE
    ) {
      errors.push('At least one OpenRouter API key must be set');
    }

    if (!process.env.CLIENT_URL && !process.env.CORS_ORIGIN) {
      errors.push('CLIENT_URL or CORS_ORIGIN must be set in production');
    }
  }

  if (errors.length > 0) {
    throw new Error(
      'Configuration validation failed:\n' + errors.join('\n')
    );
  }

  return true;
}

module.exports = {
  ...config,
  validateConfig
};