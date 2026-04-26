/**
 * WHY:
 * - Ensure AI returns structured evaluation
 * - Reject incomplete / malformed outputs
 */

// =======================
// 🧼 SANITIZE
// =======================

function sanitizeAIResponse(text) {
  if (!text || typeof text !== 'string') return null;

  let cleaned = text.trim();

  if (cleaned.length > 1500) {
    cleaned = cleaned.slice(0, 1500);
  }

  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}

// =======================
// 🚫 HARD BLOCK DETECTORS
// =======================

function isRewriting(text) {
  const signals = [
    'here is a revised',
    'rewritten',
    'corrected version',
    'rephrased',
    'improved version'
  ];

  const lower = text.toLowerCase();
  return signals.some(s => lower.includes(s));
}

function isGrammarFocused(text) {
  const signals = [
    'grammar',
    'tense',
    'punctuation',
    'spelling mistake'
  ];

  const lower = text.toLowerCase();
  return signals.some(s => lower.includes(s));
}

function isTooShort(text) {
  return text.length < 80;
}

// =======================
// 🧠 STRUCTURE CHECKS (UPDATED)
// =======================

function hasScore(text) {
  return /Score:\s*\d{1,3}\/100/i.test(text);
}

function hasBreakdown(text) {
  return (
    /Clarity:\s*\d+/i.test(text) &&
    /Ownership:\s*\d+/i.test(text) &&
    /Actionability:\s*\d+/i.test(text) &&
    /Completeness:\s*\d+/i.test(text) &&
    /Tone:\s*\d+/i.test(text)
  );
}

function hasSections(text) {
  return (
    text.includes('Strength') &&
    text.includes('Gap') &&
    text.includes('Improve')
  );
}

// =======================
// 🔥 MAIN GUARD
// =======================

function guardAIResponse(aiText, mode = 'strict') {
  const sanitized = sanitizeAIResponse(aiText);
  if (!sanitized) return null;

  // 🚫 HARD BLOCKS
  if (isRewriting(sanitized)) return null;
  if (isGrammarFocused(sanitized)) return null;
  if (isTooShort(sanitized)) return null;

  const structure = hasSections(sanitized);
  const score = hasScore(sanitized);
  const breakdown = hasBreakdown(sanitized);

  // =======================
  // ⚡ FAST MODE
  // =======================
  if (mode === 'fast') {
    if (!structure || !score) return null;
    return sanitized;
  }

  // =======================
  // 🔒 STRICT MODE
  // =======================

  if (!structure) return null;
  if (!score) return null;
  if (!breakdown) return null;

  return sanitized;
}

// =======================
// 📦 EXPORT
// =======================

module.exports = {
  sanitizeAIResponse,
  guardAIResponse
};