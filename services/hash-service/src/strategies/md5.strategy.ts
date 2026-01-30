import crypto from 'crypto';
import { HashAlgorithm } from './hash-algorithm.interface';

/**
 * MD5 hashing strategy
 */
export class MD5Hash implements HashAlgorithm {
  async hash(data: string): Promise<string> {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
