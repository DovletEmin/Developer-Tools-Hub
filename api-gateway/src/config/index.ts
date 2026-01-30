import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration
 * Centralized configuration following Single Responsibility Principle
 */
export const config = {
  // Server
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // Microservices URLs
  services: {
    codeFormatter: process.env.CODE_FORMATTER_SERVICE_URL || 'http://localhost:3001',
    jwt: process.env.JWT_SERVICE_URL || 'http://localhost:3002',
    hash: process.env.HASH_SERVICE_URL || 'http://localhost:3003',
    converter: process.env.CONVERTER_SERVICE_URL || 'http://localhost:3004',
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
};
