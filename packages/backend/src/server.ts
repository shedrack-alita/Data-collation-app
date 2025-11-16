import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import rateLimit from 'express-rate-limit';

import { connectMongoDB } from './config/database';
import { errorHandler } from './middleware/error';
import logger from './utils/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import formRoutes from './routes/form.routes';
import responseRoutes from './routes/response.routes';
import marketplaceRoutes from './routes/marketplace.routes';
import analyticsRoutes from './routes/analytics.routes';
import walletRoutes from './routes/wallet.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// Socket.io setup
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-form', (formId: string) => {
    socket.join(`form-${formId}`);
    logger.info(`Client ${socket.id} joined form ${formId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Database connections and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Start server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`📊 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

startServer();

export { app, io };
