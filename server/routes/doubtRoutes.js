const express = require('express');
const router = express.Router();

const doubtController = require('../controllers/doubtController');
const { asyncHandler } = require('../middleware/errorHandler');
const { sanitizeRequest, validateEvaluationRequest } = require('../middleware/validationMiddleware');

router.post(
  '/',
  sanitizeRequest,
  validateEvaluationRequest,
  asyncHandler(doubtController.resolveDoubt)
);

module.exports = router;