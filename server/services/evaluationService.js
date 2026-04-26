// server/services/evaluationService.js

const Attempt = require('../models/attemptModel');
const aiRefinementService = require('./aiRefinementService');

class EvaluationService {
  async evaluateResponse({
    userResponse,
    context,
    speakerRole,
    listenerRole,
    listenerQuestion,
    userId = null,
    sessionId = null
  }) {
    try {
      if (!userResponse || typeof userResponse !== 'string') {
        throw new Error('userResponse must be a non-empty string');
      }

      if (userResponse.trim().length < 10) {
        throw new Error(
          'Response too short. Minimum 10 characters required.'
        );
      }

      const cleanedResponse = userResponse.trim();

      // =========================
      // 🔥 AI REFINEMENT
      // =========================
      let aiResult = null;

      try {
        aiResult = await aiRefinementService.refine({
          mode: 'evaluation',
          userResponse: cleanedResponse,
          context,
          speakerRole,
          listenerRole,
          listenerQuestion
        });
      } catch (aiError) {
        console.warn('AI refinement failed:', aiError.message);
      }

      // =========================
      // 🔥 SAFE AI STRUCTURE
      // =========================
      const aiFeedback = {
        final: aiResult?.final || "No feedback generated",
        raw: aiResult?.raw || "",
        source: aiResult?.source || "ai"
      };

      // =========================
      // 🔥 SAVE (CORRECT STRUCTURE)
      // =========================
      const attemptData = {
        userResponse: cleanedResponse,

        context,
        speakerRole,
        listenerRole,
        listenerQuestion,

        aiFeedback,

        metadata: {
          userId,
          sessionId
        }
      };

      const savedAttempt = await Attempt.create(attemptData);

      // =========================
      // 🔥 RESPONSE
      // =========================
      return {
        success: true,
        attemptId: savedAttempt._id,
        evaluation: {
          final: aiFeedback.final,
          raw: aiFeedback.raw,
          source: aiFeedback.source
        }
      };

    } catch (error) {
      throw new Error(`Evaluation service error: ${error.message}`);
    }
  }
}

module.exports = new EvaluationService();