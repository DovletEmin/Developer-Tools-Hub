import { HashAlgorithm } from '../strategies/hash-algorithm.interface';
import { MD5Hash } from '../strategies/md5.strategy';
import { SHA256Hash } from '../strategies/sha256.strategy';
import { SHA512Hash } from '../strategies/sha512.strategy';
import { BcryptHash } from '../strategies/bcrypt.strategy';
import { AppError } from '../middleware/error.middleware';

/**
 * Hash Service
 * Uses Strategy Pattern for different hashing algorithms
 * Uses Factory Pattern for algorithm creation
 */
export class HashService {
  private algorithms: Map<string, HashAlgorithm>;

  constructor() {
    this.algorithms = new Map();
    this.registerAlgorithms();
  }

  /**
   * Register all hashing algorithms
   */
  private registerAlgorithms(): void {
    this.algorithms.set('md5', new MD5Hash());
    this.algorithms.set('sha256', new SHA256Hash());
    this.algorithms.set('sha512', new SHA512Hash());
    this.algorithms.set('bcrypt', new BcryptHash());
  }

  /**
   * Get hashing algorithm
   */
  private getAlgorithm(name: string): HashAlgorithm {
    const algorithm = this.algorithms.get(name.toLowerCase());
    
    if (!algorithm) {
      throw new AppError(
        400,
        'UNSUPPORTED_ALGORITHM',
        `Algorithm '${name}' is not supported. Supported: ${Array.from(this.algorithms.keys()).join(', ')}`
      );
    }

    return algorithm;
  }

  /**
   * Generate hash
   */
  async generate(
    data: string,
    algorithm: string,
    rounds?: number
  ): Promise<string> {
    const hashAlgorithm = this.getAlgorithm(algorithm);
    return hashAlgorithm.hash(data, rounds);
  }

  /**
   * Compare plain text with hash (for bcrypt)
   */
  async compare(data: string, hash: string): Promise<boolean> {
    try {
      const bcryptAlgorithm = this.algorithms.get('bcrypt') as BcryptHash;
      
      if (!bcryptAlgorithm || !bcryptAlgorithm.compare) {
        throw new AppError(
          500,
          'ALGORITHM_ERROR',
          'Bcrypt algorithm not available for comparison'
        );
      }
      
      return await bcryptAlgorithm.compare(data, hash);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new AppError(
        400,
        'COMPARE_ERROR',
        `Comparison failed: ${errorMessage}`
      );
    }
  }

  /**
   * Get list of supported algorithms
   */
  getSupportedAlgorithms(): string[] {
    return Array.from(this.algorithms.keys());
  }
}
