import { ConversionStrategy } from '../strategies/conversion.strategy';
import { JsonToXmlConverter } from '../strategies/json-to-xml.converter';
import { XmlToJsonConverter } from '../strategies/xml-to-json.converter';
import { JsonToYamlConverter } from '../strategies/json-to-yaml.converter';
import { YamlToJsonConverter } from '../strategies/yaml-to-json.converter';
import { AppError } from '../middleware/error.middleware';

/**
 * Converter Service
 * Uses Strategy Pattern for different conversion strategies
 * Uses Factory Pattern for converter creation
 */
export class ConverterService {
  private converters: Map<string, ConversionStrategy>;

  constructor() {
    this.converters = new Map();
    this.registerConverters();
  }

  /**
   * Register all conversion strategies
   */
  private registerConverters(): void {
    this.converters.set('json-xml', new JsonToXmlConverter());
    this.converters.set('xml-json', new XmlToJsonConverter());
    this.converters.set('json-yaml', new JsonToYamlConverter());
    this.converters.set('yaml-json', new YamlToJsonConverter());
  }

  /**
   * Get conversion key
   */
  private getConversionKey(from: string, to: string): string {
    return `${from.toLowerCase()}-${to.toLowerCase()}`;
  }

  /**
   * Get converter strategy
   */
  private getConverter(from: string, to: string): ConversionStrategy {
    const key = this.getConversionKey(from, to);
    const converter = this.converters.get(key);
    
    if (!converter) {
      const supportedConversions = Array.from(this.converters.keys())
        .map(k => k.replace('-', ' → '))
        .join(', ');
      
      throw new AppError(
        400,
        'UNSUPPORTED_CONVERSION',
        `Conversion from '${from}' to '${to}' is not supported. Supported: ${supportedConversions}`
      );
    }

    return converter;
  }

  /**
   * Convert data between formats
   */
  async convert(
    data: string,
    from: string,
    to: string,
    options?: any
  ): Promise<string> {
    const converter = this.getConverter(from, to);
    return converter.convert(data, options);
  }

  /**
   * Get list of supported conversions
   */
  getSupportedConversions(): string[] {
    return Array.from(this.converters.keys());
  }
}
