/**
 * Strategy Pattern interface for hash algorithms
 */
export interface HashAlgorithm {
  /**
   * Generate hash for given data
   * @param data - Data to hash
   * @param rounds - Optional rounds for algorithms like bcrypt
   * @returns Hash string
   */
  hash(data: string, rounds?: number): Promise<string>;
}
