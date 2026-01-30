import { ServiceResponse, ErrorResponse } from '../types';

/**
 * Utility class for creating standardized service responses
 * Following Factory Pattern for response creation
 */
export class ResponseUtil {
  /**
   * Create a success response
   */
  static success<T>(data: T): ServiceResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create an error response
   */
  static error(
    code: string,
    message: string,
    details?: any
  ): ServiceResponse {
    const error: ErrorResponse = {
      code,
      message,
      details,
    };

    return {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create a validation error response
   */
  static validationError(
    message: string,
    details?: any
  ): ServiceResponse {
    return this.error('VALIDATION_ERROR', message, details);
  }

  /**
   * Create a not found error response
   */
  static notFound(resource: string): ServiceResponse {
    return this.error(
      'NOT_FOUND',
      `${resource} not found`
    );
  }

  /**
   * Create an internal server error response
   */
  static internalError(message = 'Internal server error'): ServiceResponse {
    return this.error('INTERNAL_ERROR', message);
  }
}
