// server/routes/evaluateRoutes.js

const express = require('express');
const router = express.Router();

const evaluationController = require('../controllers/evaluateController');
const { asyncHandler } = require('../middleware/errorHandler');

// 🔥 AUTH
const authMiddleware = require('../middleware/authMiddleware');

const {
  validateEvaluationRequest,
  validateUserId,
  validateAttemptId,
  validatePagination,
  validateAnalyticsParams,
  sanitizeRequest
} = require('../middleware/validationMiddleware');

/**
 * @route   POST /api/evaluate
 * @desc    Evaluate a user response
 * @access  PRIVATE 🔐
 */
router.post(
  '/',
  authMiddleware, // 🔥 PROTECT
  sanitizeRequest,
  validateEvaluationRequest,
  asyncHandler(evaluationController.evaluate)
);

/**
 * @route   POST /api/evaluate/test
 * @desc    Test evaluation without saving to database
 * @access  Public (keep for dev)
 */
router.post(
  '/test',
  sanitizeRequest,
  validateEvaluationRequest,
  asyncHandler(evaluationController.testEvaluate)
);

/**
 * @route   GET /api/evaluate/analytics
 * @desc    Get analytics data
 * @access  PRIVATE 🔐
 */
router.get(
  '/analytics',
  authMiddleware, // 🔥 PROTECT
  validateAnalyticsParams,
  asyncHandler(evaluationController.getAnalytics)
);

/**
 * @route   GET /api/evaluate/user/history
 * @desc    Get current user's evaluation history
 * @access  PRIVATE 🔐
 */
router.get(
  '/user/history',
  authMiddleware, // 🔥 PROTECT
  validatePagination,
  asyncHandler(evaluationController.getUserHistory)
);

/**
 * @route   GET /api/evaluate/:attemptId
 * @desc    Get a specific attempt by ID
 * @access  PRIVATE 🔐
 */
router.get(
  '/:attemptId',
  authMiddleware, // 🔥 PROTECT
  validateAttemptId,
  asyncHandler(evaluationController.getAttempt)
);

module.exports = router;