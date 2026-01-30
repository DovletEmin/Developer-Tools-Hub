import { Request, Response } from 'express';
import { ConverterService } from '../services/converter.service';
import { AppError } from '../middleware/error.middleware';

/**
 * Converter Controller
 * Handles HTTP requests for format conversion
 */
export class ConverterController {
  private converterService: ConverterService;

  constructor() {
    this.converterService = new ConverterService();
  }

  /**
   * Convert between formats
   */
  async convert(req: Request, res: Response): Promise<void> {
    try {
      const { data, from, to, options } = req.body;

      // Validation
      if (!data) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Data is required'
        );
      }

      if (!from) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Source format (from) is required'
        );
      }

      if (!to) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Target format (to) is required'
        );
      }

      const converted = await this.converterService.convert(
        data,
        from,
        to,
        options
      );

      res.json({
        success: true,
        data: {
          converted,
          from,
          to,
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
          code: 'CONVERSION_ERROR',
          message: 'Failed to convert data',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}
