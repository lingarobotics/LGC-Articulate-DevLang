/**
 * WHY:
 * - Validate inputs for AI-only system
 * - No rule-engine dependency
 */

/**
 * Validate string input
 */
function validateString(value, fieldName) {
  if (!value || typeof value !== 'string') {
    throw new Error(`${fieldName} must be a non-empty string`);
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }

  return trimmed;
}

/**
 * Validate object
 */
function validateObject(obj, fieldName) {
  if (!obj || typeof obj !== 'object') {
    throw new Error(`${fieldName} must be a valid object`);
  }

  return obj;
}

/**
 * Validate mode
 */
function validateMode(mode) {
  const allowed = ['evaluation', 'doubt'];

  if (!allowed.includes(mode)) {
    throw new Error(`mode must be one of: ${allowed.join(', ')}`);
  }

  return mode;
}

/**
 * Validate level (for doubt mode)
 */
function validateLevel(level) {
  const allowed = ['worse', 'average', 'better'];

  if (!allowed.includes(level)) {
    throw new Error(`level must be one of: ${allowed.join(', ')}`);
  }

  return level;
}

/**
 * 🔥 MAIN VALIDATOR
 */
function validateAIInput(data) {
  validateObject(data, 'input');

  const {
    mode,
    context,
    speakerRole,
    listenerRole,
    listenerQuestion,
    userResponse,
    level
  } = data;

  validateMode(mode);

  // Common required fields
  validateString(context, 'context');
  validateString(speakerRole, 'speakerRole');
  validateString(listenerRole, 'listenerRole');
  validateString(listenerQuestion, 'listenerQuestion');

  if (mode === 'evaluation') {
    validateString(userResponse, 'userResponse');
  }

  if (mode === 'doubt') {
    validateString(userResponse, 'userResponse');
    validateLevel(level);
  }

  return {
    mode,
    context: context.trim(),
    speakerRole: speakerRole.trim(),
    listenerRole: listenerRole.trim(),
    listenerQuestion: listenerQuestion.trim(),
    userResponse: userResponse.trim(),
    level
  };
}

/**
 * Safe wrapper (non-throwing)
 */
function safeValidate(fn) {
  try {
    return fn();
  } catch (err) {
    console.warn('Validation Warning:', err.message);
    return null;
  }
}

module.exports = {
  validateString,
  validateObject,
  validateMode,
  validateLevel,
  validateAIInput,
  safeValidate
};