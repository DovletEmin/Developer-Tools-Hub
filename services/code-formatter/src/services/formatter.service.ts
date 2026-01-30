import { FormatterStrategy } from '../strategies/formatter.strategy';
import { JavaScriptFormatter } from '../strategies/javascript.formatter';
import { TypeScriptFormatter } from '../strategies/typescript.formatter';
import { JSONFormatter } from '../strategies/json.formatter';
import { PythonFormatter } from '../strategies/python.formatter';
import { AppError } from '../middleware/error.middleware';

/**
 * Formatter Service
 * Uses Strategy Pattern for different formatting strategies
 * Uses Factory Pattern for strategy creation
 */
export class FormatterService {
  private strategies: Map<string, FormatterStrategy>;

  constructor() {
    this.strategies = new Map();
    this.registerStrategies();
  }

  /**
   * Register all formatting strategies
   * Following Factory Pattern
   */
  private registerStrategies(): void {
    this.strategies.set('javascript', new JavaScriptFormatter());
    this.strategies.set('js', new JavaScriptFormatter());
    this.strategies.set('typescript', new TypeScriptFormatter());
    this.strategies.set('ts', new TypeScriptFormatter());
    this.strategies.set('json', new JSONFormatter());
    this.strategies.set('python', new PythonFormatter());
    this.strategies.set('py', new PythonFormatter());
  }

  /**
   * Get formatter strategy for language
   */
  private getStrategy(language: string): FormatterStrategy {
    const strategy = this.strategies.get(language.toLowerCase());
    
    if (!strategy) {
      throw new AppError(
        400,
        'UNSUPPORTED_LANGUAGE',
        `Language '${language}' is not supported. Supported: ${Array.from(this.strategies.keys()).join(', ')}`
      );
    }

    return strategy;
  }

  /**
   * Format code using appropriate strategy
   */
  async format(
    code: string,
    language: string,
    options?: any
  ): Promise<string> {
    const strategy = this.getStrategy(language);
    return strategy.format(code, options);
  }

  /**
   * Get list of supported languages
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.strategies.keys());
  }
}
