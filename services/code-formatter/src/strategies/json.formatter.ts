import { FormatterStrategy } from './formatter.strategy';

/**
 * JSON formatter strategy
 */
export class JSONFormatter implements FormatterStrategy {
  async format(code: string, options?: any): Promise<string> {
    const indent = options?.indent || 2;

    try {
      const parsed = JSON.parse(code);
      const formatted = JSON.stringify(parsed, null, indent);
      return formatted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`JSON formatting error: ${errorMessage}`);
    }
  }
}
