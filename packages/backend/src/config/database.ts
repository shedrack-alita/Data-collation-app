import mongoose from 'mongoose';
import logger from '../utils/logger';

// MongoDB connection
export async function connectMongoDB(): Promise<void> {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/data_platform';
    await mongoose.connect(mongoUri);

    mongoose.connection.on('connected', () => {
      logger.info('✅ MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️  MongoDB disconnected');
    });
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export { mongoose };

