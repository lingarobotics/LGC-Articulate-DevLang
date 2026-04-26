/**
 * WHY:
 * Central orchestration layer for AI execution
 * Controls:
 * - model order (priority)
 * - key rotation (rate-limit handling)
 * - modelIndex mapping (prompt control)
 * - provider fallback strategy
 *
 * DESIGN:
 * - Early attempts → best structured models
 * - Mid attempts → reasoning diversity
 * - Late attempts → weaker / fallback models
 * - Final → Gemini (provider fallback)
 */

const attemptStack = [

  // =========================
  // 🥇 PRIMARY LAYER (STRICT CONTROL)
  // =========================

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_ONE',
    keyEnv: 'OPENROUTER_API_KEY_ONE',
    modelIndex: 'ONE'
  },
  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_ONE',
    keyEnv: 'OPENROUTER_API_KEY_TWO',
    modelIndex: 'ONE'
  },

  // =========================
  // 🥈 SECONDARY (VERBOSE CONTROL)
  // =========================

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_TWO',
    keyEnv: 'OPENROUTER_API_KEY_ONE',
    modelIndex: 'TWO'
  },
  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_TWO',
    keyEnv: 'OPENROUTER_API_KEY_TWO',
    modelIndex: 'TWO'
  },

  // =========================
  // 🧠 STRUCTURE + DIVERSITY
  // =========================

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_THREE',
    keyEnv: 'OPENROUTER_API_KEY_THREE',
    modelIndex: 'THREE'
  },

  // =========================
  // 🧠 BALANCED / HEAVY MODELS
  // =========================

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_FOUR',
    keyEnv: 'OPENROUTER_API_KEY_THREE',
    modelIndex: 'FOUR'
  },

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_FIVE',
    keyEnv: 'OPENROUTER_API_KEY_FOUR',
    modelIndex: 'FIVE'
  },

  // =========================
  // ⚡ LAST OPENROUTER FALLBACK
  // =========================

  {
    provider: 'openrouter',
    modelEnv: 'AI_MODEL_SIX',
    keyEnv: 'OPENROUTER_API_KEY_FOUR',
    modelIndex: 'SIX'
  },

  // =========================
  // 🔥 PROVIDER FALLBACK — GEMINI
  // =========================

  {
    provider: 'gemini',
    keyEnv: 'GEMINI_API_KEY_ONE'
  },
  {
    provider: 'gemini',
    keyEnv: 'GEMINI_API_KEY_TWO'
  },
  {
    provider: 'gemini',
    keyEnv: 'GEMINI_API_KEY_THREE'
  },
  {
    provider: 'gemini',
    keyEnv: 'GEMINI_API_KEY_FOUR'
  }

];

module.exports = attemptStack;