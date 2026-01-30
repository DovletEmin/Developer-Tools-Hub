/**
 * Centralized logger implementation
 * Implements Singleton Pattern for logger instance
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  metadata?: any;
}

export class Logger {
  private context: string;

  private constructor(context: string) {
    this.context = context;
  }

  /**
   * Create a new logger with specific context
   */
  static create(context: string): Logger {
    return new Logger(context);
  }

  /**
   * Get default logger instance
   * @deprecated Use Logger.create() instead for proper context
   */
  static getDefault(): Logger {
    return new Logger('default');
  }

  private log(level: LogLevel, message: string, metadata?: any): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: this.context,
      metadata,
    };

    const logMessage = this.formatLog(entry);

    switch (level) {
      case LogLevel.ERROR:
        console.error(logMessage);
        break;
      case LogLevel.WARN:
        console.warn(logMessage);
        break;
      case LogLevel.DEBUG:
        console.debug(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, metadata } = entry;
    let log = `[${timestamp}] [${level.toUpperCase()}] [${context}] ${message}`;

    if (metadata) {
      log += ` ${JSON.stringify(metadata)}`;
    }

    return log;
  }

  debug(message: string, metadata?: any): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }

  info(message: string, metadata?: any): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  warn(message: string, metadata?: any): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  error(message: string, error?: Error | any): void {
    const metadata = error instanceof Error
      ? { message: error.message, stack: error.stack }
      : error;
    this.log(LogLevel.ERROR, message, metadata);
  }
}
