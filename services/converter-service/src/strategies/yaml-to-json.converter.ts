import yaml from 'js-yaml';
import { ConversionStrategy } from './conversion.strategy';

/**
 * YAML to JSON converter strategy
 */
export class YamlToJsonConverter implements ConversionStrategy {
  async convert(data: string, options?: any): Promise<string> {
    try {
      const parsed = yaml.load(data);
      const jsonData = JSON.stringify(parsed, null, options?.indent || 2);
      
      return jsonData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`YAML to JSON conversion error: ${errorMessage}`);
    }
  }
}
