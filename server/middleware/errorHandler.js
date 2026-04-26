// WHY: Centralized error handling ensures consistent error responses.
// This middleware catches all errors from routes/controllers/services and formats them uniformly.

/**
 * Error handling middleware
 * Must be the last middleware in the chain
 */
function errorHandler(err, req, res, next) {
  // Log error for debugging (in production, use proper logging service)
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error status
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Duplicate key error (safe handling)
  if (err.code === 11000) {
    statusCode = 409;
    const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : 'unknown';
    message = `Duplicate value for field: ${field}`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Custom error for evaluation-specific issues (kept for compatibility)
  if (typeof message === 'string') {
    if (message.includes('Response too short')) {
      statusCode = 400;
    }

    if (message.includes('Attempt not found')) {
      statusCode = 404;
    }
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        details: err
      })
    }
  });
}

/**
 * Not Found handler
 * Handles 404 errors for undefined routes
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

/**
 * Async handler wrapper
 * Wraps async route handlers to catch rejected promises
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
};