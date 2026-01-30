import { Request, Response } from 'express';
import { FormatterService } from '../services/formatter.service';
import { AppError } from '../middleware/error.middleware';

/**
 * Formatter Controller
 * Handles HTTP requests for code formatting
 * Follows Controller pattern from MVC
 */
export class FormatterController {
  private formatterService: FormatterService;

  constructor() {
    this.formatterService = new FormatterService();
  }

  /**
   * Format code endpoint
   */
  async format(req: Request, res: Response): Promise<void> {
    try {
      const { code, language, options } = req.body;

      // Validation
      if (!code) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Code is required'
        );
      }

      if (!language) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Language is required'
        );
      }

      // Format code
      const formatted = await this.formatterService.format(
        code,
        language,
        options
      );

      res.json({
        success: true,
        data: {
          formatted,
          language,
          originalLength: code.length,
          formattedLength: formatted.length,
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
      res.status(500).json({
        success: false,
        error: {
          code: 'FORMATTING_ERROR',
          message: 'Failed to format code',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}
