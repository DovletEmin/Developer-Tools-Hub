import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/error.middleware';
import { rateLimiter } from './middleware/rate-limiter.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import routes from './routes';

/**
 * Application class following Singleton Pattern
 * Manages Express app configuration and middleware setup
 */
export class App {
  private app: Application;
  private static instance: App;

  private constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Get App instance (Singleton Pattern)
   */
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  /**
   * Initialize Express middlewares
   */
  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(cors({
      origin: config.corsOrigin,
      credentials: true,
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging
    this.app.use(requestLogger);

    // Rate limiting
    this.app.use('/api', rateLimiter);
  }

  /**
   * Initialize application routes
   */
  private initializeRoutes(): void {
    this.app.use('/api/v1', routes);

    // Health check endpoint
    this.app.get('/health', (req: express.Request, res: express.Response) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });
  }

  /**
   * Initialize error handling middleware
   */
  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  /**
   * Get Express application
   */
  public getApp(): Application {
    return this.app;
  }

  /**
   * Start the server
   */
  public listen(): void {
    this.app.listen(config.port, () => {
      console.log(`🚀 API Gateway running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
    });
  }
}
