/**
 * Strategy Pattern interface for converters
 */
export interface ConversionStrategy {
  /**
   * Convert data from one format to another
   * @param data - Input data
   * @param options - Conversion options
   * @returns Converted data
   */
  convert(data: string, options?: any): Promise<string>;
}
