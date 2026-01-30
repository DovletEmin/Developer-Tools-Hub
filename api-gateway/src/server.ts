import { App } from './app';

/**
 * Server entry point
 */
const app = App.getInstance();
app.listen();

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
