import { Builder } from 'xml2js';
import { ConversionStrategy } from './conversion.strategy';

/**
 * JSON to XML converter strategy
 */
export class JsonToXmlConverter implements ConversionStrategy {
  async convert(data: string, options?: any): Promise<string> {
    try {
      const jsonData = JSON.parse(data);
      
      const builder = new Builder({
        rootName: options?.rootName || 'root',
        renderOpts: { pretty: true, indent: '  ' },
        ...options,
      });

      const xml = builder.buildObject(jsonData);
      return xml;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`JSON to XML conversion error: ${errorMessage}`);
    }
  }
}
