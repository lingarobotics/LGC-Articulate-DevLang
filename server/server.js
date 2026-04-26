// 🔥 MUST BE FIRST — load env before anything
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const { connectDB } = require('./config/database');

const evaluationRoutes = require('./routes/evaluationRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const authRoutes = require('./routes/authRoutes');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// 🔥 Validate env
config.validateConfig();

const app = express();

// ============================================
// 🔐 MIDDLEWARE
// ============================================

app.use(helmet());

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 🔥 APPLY RATE LIMIT ONLY TO API (NOT GLOBAL UI)
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    error: {
      message: 'Too many requests. Please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api', limiter); // ✅ FIXED

// ============================================
// 🌐 ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Root
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LGC Articulate — DevLang API',
    version: '1.0.0',
    description: 'Intent-based communication evaluation engine',
    endpoints: {
      health: 'GET /health',
      evaluate: 'POST /api/evaluate',
      getHistory: 'GET /api/evaluate/user/history',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        forgot: 'POST /api/auth/forgot-password',
        reset: 'POST /api/auth/reset-password'
      }
    }
  });
});

// 🔥 MAIN ROUTES
app.use(`${config.apiPrefix}/evaluate`, evaluationRoutes);
app.use(`${config.apiPrefix}/doubt`, doubtRoutes);
app.use(`${config.apiPrefix}/auth`, authRoutes);

// ============================================
// ❌ ERROR HANDLING
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// 🚀 SERVER START
// ============================================

async function startServer() {
  try {
    // 🔥 REMOVE THESE IN PROD (optional debug)
    console.log("ENV:", config.nodeEnv);

    await connectDB(config.mongoUri);

    const server = app.listen(config.port, () => {
      console.log('============================================');
      console.log('  LGC Articulate — DevLang API');
      console.log('============================================');
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Port: ${config.port}`);
      console.log(`API Base: ${config.apiPrefix}`);
      console.log('============================================');
    });

    // 🔥 GRACEFUL SHUTDOWN
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down...`);

      server.close(async () => {
        console.log('Server closed');

        const { disconnectDB } = require('./config/database');
        await disconnectDB();

        process.exit(0);
      });

      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });

    return server;

  } catch (error) {
    console.error('Server start failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };