import { Router, Request, Response, NextFunction } from 'express';
import { ProxyService } from '../services/proxy.service';
import { config } from '../config';

/**
 * Code Formatter routes
 */
const router = Router();
const proxyService = new ProxyService(config.services.codeFormatter);

/**
 * POST /api/v1/formatter/format
 * Format code
 */
router.post('/format', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/format', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/formatter/health
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
