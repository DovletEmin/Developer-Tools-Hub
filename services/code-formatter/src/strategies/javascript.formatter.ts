import prettier from 'prettier';
import { FormatterStrategy } from './formatter.strategy';

/**
 * JavaScript formatter strategy using Prettier
 */
export class JavaScriptFormatter implements FormatterStrategy {
  async format(code: string, options?: any): Promise<string> {
    const defaultOptions = {
      parser: 'babel',
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5' as const,
      ...options,
    };

    try {
      const formatted = await prettier.format(code, defaultOptions);
      return formatted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`JavaScript formatting error: ${errorMessage}`);
    }
  }
}
