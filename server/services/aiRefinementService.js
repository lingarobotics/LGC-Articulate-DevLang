const axios = require('axios');
const attemptStack = require('../config/attemptStack');

const {
  modelEvaluationPrompts,
  modelDoubtPrompts,
  geminiEvaluationPrompt,
  geminiDoubtPrompt
} = require('../config/modelPrompts');

const { guardAIResponse } = require('../utils/aiGuard');

class AIRefinementService {
  constructor() {
    this.openRouterURL = 'https://openrouter.ai/api/v1/chat/completions';
    this.geminiURL =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    this.timeout = parseInt(process.env.AI_TIMEOUT) || 13000;
    this.maxTokens = parseInt(process.env.AI_MAX_TOKENS) || 400;
    this.temperature = parseFloat(process.env.AI_TEMPERATURE) || 0.3;
  }

  async refine({
    mode = 'evaluation',
    userResponse,
    context,
    speakerRole,
    listenerRole,
    listenerQuestion,
    level
  }) {
    try {
      if (!userResponse || typeof userResponse !== 'string') {
        throw new Error('Invalid userResponse');
      }

      const cleaned = userResponse.trim();
      const roleString = this._buildRoleString(speakerRole, listenerRole);

      const userPrompt =
        mode === 'evaluation'
          ? this._buildEvaluationPrompt({
              userResponse: cleaned,
              context,
              role: roleString,
              listenerQuestion
            })
          : this._buildDoubtPrompt(
              cleaned,
              context,
              roleString,
              listenerQuestion,
              level
            );

      for (let i = 0; i < attemptStack.length; i++) {
        const attempt = attemptStack[i];
        let raw = null;

        if (attempt.provider === 'openrouter') {
          const model = process.env[attempt.modelEnv];
          const key = process.env[attempt.keyEnv];

          const systemPrompt =
            mode === 'evaluation'
              ? modelEvaluationPrompts[attempt.modelIndex]
              : modelDoubtPrompts[attempt.modelIndex];

          raw = await this._callOpenRouter({
            model,
            key,
            systemPrompt,
            userPrompt
          });

        } else if (attempt.provider === 'gemini') {
          const key = process.env[attempt.keyEnv];

          const systemPrompt =
            mode === 'evaluation'
              ? geminiEvaluationPrompt
              : geminiDoubtPrompt;

          raw = await this._callGemini({
            key,
            systemPrompt,
            userPrompt
          });
        }

        if (!raw || typeof raw !== 'string') continue;

        let safe;

        if (mode === 'doubt') {
          safe = raw;
        } else {
          const isEarly = i < 3;
          safe = guardAIResponse(raw, isEarly ? 'fast' : 'strict');
        }

        if (safe) {
          return {
            final: this._formatOutput(safe),
            raw,
            source: `${attempt.provider}-attempt-${i + 1}`
          };
        }
      }

      return {
        final: this._buildSmartFallback(),
        raw: null,
        source: 'fallback'
      };

    } catch (err) {
      return {
        final: err.message,
        raw: null,
        source: 'internal-error'
      };
    }
  }

  // =====================
  // FORMAT OUTPUT
  // =====================

  _formatOutput(text) {
    if (!text) return text;

    return text
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  // =====================
  // OPENROUTER
  // =====================

  async _callOpenRouter({ model, key, systemPrompt, userPrompt }) {
    try {
      if (!model || !key) return null;

      const response = await axios.post(
        this.openRouterURL,
        {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: this.temperature,
          max_tokens: this.maxTokens
        },
        {
          timeout: this.timeout,
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data?.choices?.[0]?.message?.content || null;

    } catch {
      return null;
    }
  }

  // =====================
  // GEMINI
  // =====================

  async _callGemini({ key, systemPrompt, userPrompt }) {
    try {
      if (!key) return null;

      const response = await axios.post(
        `${this.geminiURL}?key=${key}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\n${userPrompt}`
                }
              ]
            }
          ]
        },
        {
          timeout: this.timeout
        }
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    } catch {
      return null;
    }
  }

  // =====================
  // PROMPTS
  // =====================

  _buildEvaluationPrompt({
    userResponse,
    context,
    role,
    listenerQuestion
  }) {
    return `
CONVERSATION:
${context}

-----------------------------------

YOU ARE:
${role}

-----------------------------------

QUESTION FROM LISTENER:
"${listenerQuestion}"

-----------------------------------

RESPONSE TO EVALUATE:
"${userResponse}"

-----------------------------------

TASK:

Evaluate the response based on professional communication quality.

SCORING FRAMEWORK (MANDATORY):

1. Clarity (0–20)
2. Ownership (0–20)
3. Actionability (0–20)
4. Completeness (0–20)
5. Tone (0–20)

RULES:
- Total MUST equal sum of all 5
- Do NOT inflate scores
- Do NOT give perfect score unless truly complete

-----------------------------------

OUTPUT FORMAT (STRICT — NO DEVIATION):

Score: <number>/100

Breakdown:
- Clarity: <x>/20
- Ownership: <x>/20
- Actionability: <x>/20
- Completeness: <x>/20
- Tone: <x>/20

Strength:
<what is done well>

Gap:
<what is missing>

Improve:
<how to improve>

-----------------------------------

STRICT RULES:
- DO NOT add extra commentary
- DO NOT rename sections
- DO NOT skip sections
`;
  }

  _buildDoubtPrompt(userInput, context, role, listenerQuestion, level) {
    // 🔒 untouched (your original logic)
    let levelBlock = '';

    if (level === 'worse') {
      levelBlock = `LEVEL: WORSE ...`;
    } else if (level === 'average') {
      levelBlock = `LEVEL: AVERAGE ...`;
    } else if (level === 'better') {
      levelBlock = `LEVEL: BETTER ...`;
    }

    return `
${levelBlock}

CONTEXT:
${context}

ROLES:
${role}

LISTENER QUESTION:
"${listenerQuestion}"

USER INPUT:
"${userInput}"
`;
  }

  _buildRoleString(speaker, listener) {
    if (!speaker || !listener) return 'Professional communication';
    return `${speaker} speaking to ${listener}`;
  }

  _buildSmartFallback() {
    return "Unable to generate structured response at this time.";
  }
}

module.exports = new AIRefinementService();