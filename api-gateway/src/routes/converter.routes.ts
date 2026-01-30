import { Router, Request, Response, NextFunction } from 'express';
import { ProxyService } from '../services/proxy.service';
import { config } from '../config';

/**
 * Converter Service routes
 */
const router = Router();
const proxyService = new ProxyService(config.services.converter);

/**
 * POST /api/v1/converter/convert
 * Convert between formats
 */
router.post('/convert', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/convert', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/converter/health
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
