import { Router, Request, Response, NextFunction } from 'express';
import { ProxyService } from '../services/proxy.service';
import { config } from '../config';

/**
 * JWT Service routes
 */
const router = Router();
const proxyService = new ProxyService(config.services.jwt);

/**
 * POST /api/v1/jwt/decode
 * Decode JWT token
 */
router.post('/decode', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/decode', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/jwt/encode
 * Encode JWT token
 */
router.post('/encode', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/encode', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/jwt/verify
 * Verify JWT token
 */
router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/verify', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/jwt/health
 * Check service health
 */
router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/health', 'GET');
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
