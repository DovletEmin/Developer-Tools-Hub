import { Request, Response } from 'express';
import { JwtService } from '../services/jwt.service';
import { AppError } from '../middleware/error.middleware';

/**
 * JWT Controller
 * Handles HTTP requests for JWT operations
 */
export class JwtController {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  /**
   * Decode JWT token
   */
  async decode(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Token is required'
        );
      }

      const decoded = this.jwtService.decode(token);

      res.json({
        success: true,
        data: decoded,
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
          code: 'DECODE_ERROR',
          message: 'Failed to decode token',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Encode JWT token
   */
  async encode(req: Request, res: Response): Promise<void> {
    try {
      const { payload, secret, options } = req.body;

      if (!payload) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Payload is required'
        );
      }

      if (!secret) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Secret is required'
        );
      }

      const token = this.jwtService.encode(payload, secret, options);

      res.json({
        success: true,
        data: { token },
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
          code: 'ENCODE_ERROR',
          message: 'Failed to encode token',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Verify JWT token
   */
  async verify(req: Request, res: Response): Promise<void> {
    try {
      const { token, secret } = req.body;

      if (!token) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Token is required'
        );
      }

      if (!secret) {
        throw new AppError(
          400,
          'VALIDATION_ERROR',
          'Secret is required'
        );
      }

      const result = this.jwtService.verify(token, secret);

      res.json({
        success: true,
        data: result,
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
          code: 'VERIFY_ERROR',
          message: 'Failed to verify token',
          details: { error: (error as Error).message },
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}
