require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const { connectDB, disconnectDB } = require('./config/database');

const evaluationRoutes = require('./routes/evaluationRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const authRoutes = require('./routes/authRoutes');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

config.validateConfig();

const app = express();

// ===================== MIDDLEWARE =====================

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

app.use('/api', limiter);

// ===================== ROUTES =====================

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LGC Articulate — DevLang API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      evaluate: 'POST /api/evaluate'
    }
  });
});

app.use(`${config.apiPrefix}/evaluate`, evaluationRoutes);
app.use(`${config.apiPrefix}/doubt`, doubtRoutes);
app.use(`${config.apiPrefix}/auth`, authRoutes);

// ===================== ERROR HANDLING =====================

app.use(notFoundHandler);
app.use(errorHandler);

// ===================== SERVER =====================

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);

      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });

      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    return server;

  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };