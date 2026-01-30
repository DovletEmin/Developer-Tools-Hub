import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

/**
 * JWT Service
 * Handles JWT token operations
 */
export class JwtService {
  /**
   * Decode JWT token without verification
   */
  decode(token: string): JwtPayload | null {
    try {
      const decoded = jwt.decode(token, { complete: true });
      
      if (!decoded) {
        throw new Error('Invalid token');
      }

      return {
        header: decoded.header,
        payload: decoded.payload,
      } as any;
    } catch (error) {
      throw new Error(`Failed to decode token: ${(error as Error).message}`);
    }
  }

  /**
   * Encode (sign) JWT token
   */
  encode(
    payload: object,
    secret: string,
    options?: SignOptions
  ): string {
    try {
      const defaultOptions: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '1h',
        ...options,
      };

      const token = jwt.sign(payload, secret, defaultOptions);
      return token;
    } catch (error) {
      throw new Error(`Failed to encode token: ${(error as Error).message}`);
    }
  }

  /**
   * Verify JWT token
   */
  verify(
    token: string,
    secret: string
  ): { valid: boolean; decoded?: JwtPayload; error?: string } {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      
      return {
        valid: true,
        decoded,
      };
    } catch (error) {
      return {
        valid: false,
        error: (error as Error).message,
      };
    }
  }
}
