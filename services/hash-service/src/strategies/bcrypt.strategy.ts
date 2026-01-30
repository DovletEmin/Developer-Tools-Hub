import bcrypt from 'bcryptjs';
import { HashAlgorithm } from './hash-algorithm.interface';

/**
 * Bcrypt hashing strategy
 */
export class BcryptHash implements HashAlgorithm {
  async hash(data: string, rounds: number = 10): Promise<string> {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(data, salt);
  }

  /**
   * Compare plain text with hashed value
   */
  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
