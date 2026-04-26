// server/controllers/evaluationController.js

const evaluationService = require('../services/evaluationService');
const Attempt = require('../models/attemptModel');
const mongoose = require('mongoose');

class EvaluationController {

  async evaluate(req, res, next) {
    try {
      const {
        userResponse,
        sessionId,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion
      } = req.body;

      const userId = req.user?.id;

      const result = await evaluationService.evaluateResponse({
        userResponse,
        userId,
        sessionId,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion
      });

      return res.status(200).json({
        success: true,
        ...result
      });

    } catch (error) {
      next(error);
    }
  }

  async getUserHistory(req, res, next) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized"
        });
      }

      // 🔥 IMPORTANT FIX
      const objectId = new mongoose.Types.ObjectId(userId);

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const attempts = await Attempt.find({
        $or: [
          { userId: objectId },
          { "metadata.userId": objectId }
        ]
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      res.status(200).json({
        success: true,
        data: attempts
      });

    } catch (error) {
      console.error("History error:", error);
      next(error);
    }
  }

  async getAttempt(req, res, next) {
    try {
      const { attemptId } = req.params;

      const result = await evaluationService.getAttempt(attemptId);

      res.status(200).json({
        success: true,
        data: result?.attempt || null
      });

    } catch (error) {
      next(error);
    }
  }

  async testEvaluate(req, res, next) {
    try {
      const {
        userResponse,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion
      } = req.body;

      if (!userResponse || typeof userResponse !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'userResponse is required'
        });
      }

      const result = await evaluationService.evaluateResponse({
        userResponse,
        context,
        speakerRole,
        listenerRole,
        listenerQuestion
      });

      res.status(200).json({
        success: true,
        ...result
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EvaluationController();