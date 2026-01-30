import { Request, Response } from 'express';
import { HashService } from '../services/hash.service';
import { AppError } from '../middleware/error.middleware';

/**
 * Hash Controller
 * Handles HTTP requests for hash operations
 */
export class HashController {
  private hashService: HashService;

  constructor() {
    this.hashService = new HashService();
  }

  /**
   * Generate hash
   */
  async generate(req: Request, res: Response): Promise<void> {
    try {
      const { data, algorithm, rounds } = req.body;

      if (!data) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Data is required'
        );
      }

      if (!algorithm) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Algorithm is required'
        );
      }

      const hash = await this.hashService.generate(data, algorithm, rounds);

      res.json({
        success: true,
        data: {
          hash,
          algorithm,
          inputLength: data.length,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: {
          code: 'HASH_ERROR',
          message: 'Failed to generate hash',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Compare plain text with hash (for bcrypt)
   */
  async compare(req: Request, res: Response): Promise<void> {
    try {
      const { data, hash } = req.body;

      if (!data) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Data is required'
        );
      }

      if (!hash) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Hash is required'
        );
      }

      const match = await this.hashService.compare(data, hash);

      res.json({
        success: true,
        data: { match },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: {
          code: 'COMPARE_ERROR',
          message: 'Failed to compare hash',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}
