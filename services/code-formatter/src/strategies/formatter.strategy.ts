/**
 * Strategy Pattern interface for code formatters
 * Each language formatter implements this interface
 */
export interface FormatterStrategy {
  /**
   * Format code according to language-specific rules
   * @param code - Source code to format
   * @param options - Formatter options
   * @returns Formatted code
   */
  format(code: string, options?: any): Promise<string>;
}
