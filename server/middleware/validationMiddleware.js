// WHY: Input validation middleware prevents invalid data from reaching business logic.
// This middleware validates request structure before controllers process requests.

/**
 * Validate evaluation request body
 */
function validateEvaluationRequest(req, res, next) {
  const { userResponse } = req.body;

  const errors = [];

  // Check if userResponse exists
  if (!userResponse) {
    errors.push('userResponse is required');
  }

  // Check type
  if (userResponse && typeof userResponse !== 'string') {
    errors.push('userResponse must be a string');
  }

  // Check length
  if (typeof userResponse === 'string') {
    const trimmed = userResponse.trim();

    if (trimmed.length === 0) {
      errors.push('userResponse cannot be empty');
    }

    if (trimmed.length < 10) {
      errors.push('userResponse must be at least 10 characters long');
    }

    if (trimmed.length > 10000) {
      errors.push('userResponse must not exceed 10,000 characters');
    }

    // Sanitize (trim only after validation)
    req.body.userResponse = trimmed;
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors
      }
    });
  }

  next();
}

/**
 * Validate user ID parameter
 */
function validateUserId(req, res, next) {
  const { userId } = req.params;

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid userId parameter'
      }
    });
  }

  next();
}

/**
 * Validate attempt ID parameter
 */
function validateAttemptId(req, res, next) {
  const { attemptId } = req.params;

  if (!attemptId || typeof attemptId !== 'string' || attemptId.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid attemptId parameter'
      }
    });
  }

  // MongoDB ObjectId validation
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  if (!objectIdPattern.test(attemptId)) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'attemptId must be a valid ObjectId'
      }
    });
  }

  next();
}

/**
 * Validate pagination query parameters
 */
function validatePagination(req, res, next) {
  const { limit, skip } = req.query;

  const errors = [];

  if (limit !== undefined) {
    const limitNum = Number(limit);

    if (Number.isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      errors.push('limit must be between 1 and 100');
    }
  }

  if (skip !== undefined) {
    const skipNum = Number(skip);

    if (Number.isNaN(skipNum) || skipNum < 0) {
      errors.push('skip must be a non-negative integer');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid pagination parameters',
        details: errors
      }
    });
  }

  next();
}

/**
 * Validate analytics query parameters
 */
function validateAnalyticsParams(req, res, next) {
  const { timeframe } = req.query;

  const validTimeframes = ['all', 'day', 'week', 'month'];

  if (timeframe && !validTimeframes.includes(timeframe)) {
    return res.status(400).json({
      success: false,
      error: {
        message: `Invalid timeframe. Must be one of: ${validTimeframes.join(', ')}`
      }
    });
  }

  next();
}

/**
 * General request sanitization
 */
function sanitizeRequest(req, res, next) {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;

    // Remove script tags (basic XSS protection)
    return str.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    );
  };

  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }

  next();
}

module.exports = {
  validateEvaluationRequest,
  validateUserId,
  validateAttemptId,
  validatePagination,
  validateAnalyticsParams,
  sanitizeRequest
};