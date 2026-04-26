/**
 * WHY:
 * - Build clean role string for AI
 * - Avoid injecting artificial/generic context
 * - Use real conversation from frontend
 */

/**
 * Build role relationship string
 */
function buildRoleString(speaker, listener) {
  if (!speaker || !listener) {
    return 'Professional communication';
  }

  return `${speaker} speaking to ${listener}`;
}

/**
 * 🔥 FINAL CONTEXT BUILDER
 * Uses real conversation only
 */
function buildFullContext({ context, speakerRole, listenerRole }) {
  const role = buildRoleString(speakerRole, listenerRole);

  return `
CONVERSATION:
${context}

-----------------------------------

YOU ARE:
${role}
`;
}

module.exports = {
  buildRoleString,
  buildFullContext
};