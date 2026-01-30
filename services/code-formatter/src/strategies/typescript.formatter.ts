import prettier from 'prettier';
import { FormatterStrategy } from './formatter.strategy';

/**
 * TypeScript formatter strategy using Prettier
 */
export class TypeScriptFormatter implements FormatterStrategy {
  async format(code: string, options?: any): Promise<string> {
    const defaultOptions = {
      parser: 'typescript',
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'all' as const,
      ...options,
    };

    try {
      const formatted = await prettier.format(code, defaultOptions);
      return formatted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`TypeScript formatting error: ${errorMessage}`);
    }
  }
}
