import crypto from 'crypto';
import { HashAlgorithm } from './hash-algorithm.interface';

/**
 * SHA-256 hashing strategy
 */
export class SHA256Hash implements HashAlgorithm {
  async hash(data: string): Promise<string> {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
