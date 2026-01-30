import yaml from 'js-yaml';
import { ConversionStrategy } from './conversion.strategy';

/**
 * JSON to YAML converter strategy
 */
export class JsonToYamlConverter implements ConversionStrategy {
  async convert(data: string, options?: any): Promise<string> {
    try {
      const jsonData = JSON.parse(data);
      const yamlData = yaml.dump(jsonData, {
        indent: 2,
        lineWidth: -1,
        ...options,
      });
      
      return yamlData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`JSON to YAML conversion error: ${errorMessage}`);
    }
  }
}
