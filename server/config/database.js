const mongoose = require('mongoose');

/**
 * Connect to MongoDB (Production Ready)
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI is not defined');
    process.exit(1);
  }

  try {
    const options = {
      maxPoolSize: 10,
      minPoolSize: 2,

      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,

      autoIndex: process.env.NODE_ENV !== 'production'
    };

    const conn = await mongoose.connect(uri, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 🔥 EVENTS
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔁 MongoDB reconnected');
    });

    return conn;

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // 🔥 Fail fast in production
  }
}

/**
 * Disconnect from MongoDB
 */
async function disconnectDB() {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
    throw error;
  }
}

/**
 * Get connection status
 */
function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return states[mongoose.connection.readyState] || 'unknown';
}

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus
};