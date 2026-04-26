// WHY: Handles doubt (coaching) requests only

const aiRefinementService = require('../services/aiRefinementService');

class DoubtController {

  /**
   * POST /api/doubt
   * → Doubt Mode (Coaching Engine)
   */
  async resolveDoubt(req, res, next) {
    try {
      const {
        userResponse,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion,
        level   // 🔥 ADD THIS
      } = req.body;

      if (!userResponse || typeof userResponse !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'userResponse is required and must be a string'
        });
      }

      const aiResult = await aiRefinementService.refine({
        mode: 'doubt',
        userResponse,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion,
        level   
      });

      return res.status(200).json({
        success: true,
        data: aiResult   // { final, raw, source }
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoubtController();