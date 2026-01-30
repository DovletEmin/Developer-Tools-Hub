import { parseString } from 'xml2js';
import { ConversionStrategy } from './conversion.strategy';

/**
 * XML to JSON converter strategy
 */
export class XmlToJsonConverter implements ConversionStrategy {
  async convert(data: string, options?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const parseOptions = {
        explicitArray: false,
        ignoreAttrs: false,
        ...options,
      };

      parseString(data, parseOptions, (err, result) => {
        if (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          reject(new Error(`XML to JSON conversion error: ${errorMessage}`));
        } else {
          resolve(JSON.stringify(result, null, 2));
        }
      });
    });
  }
}
