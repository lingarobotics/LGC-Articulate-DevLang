const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema(
  {
    userResponse: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Response must be at least 10 characters']
    },

    // 🔥 LINK USER (IMPORTANT FIX)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },

    // 🔥 CONTEXT
    context: String,
    speakerRole: String,
    listenerRole: String,
    listenerQuestion: String,

    // 🔥 AI OUTPUT
    aiFeedback: {
      final: String,
      raw: String,
      source: String
    },

    // 🔥 OPTIONAL META
    sessionId: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// 🔥 INDEXES
attemptSchema.index({ userId: 1, createdAt: -1 });
attemptSchema.index({ sessionId: 1 });

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;