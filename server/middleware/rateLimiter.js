const rateLimit = require('express-rate-limit');

/**
 * General API limiter
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Evaluation limiter
 */
const evaluationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 25,
  message: {
    success: false,
    error: 'Too many evaluation requests. Slow down.'
  }
});

/**
 * AI limiter (strict)
 */
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 8,
  message: {
    success: false,
    error: 'AI usage limit reached. Please wait a moment.'
  }
});

/**
 * Auth limiter
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: 'Too many login attempts. Try again later.'
  }
});

module.exports = {
  apiLimiter,
  evaluationLimiter,
  aiLimiter,
  authLimiter
};