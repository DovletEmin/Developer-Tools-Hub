import { Router, Request, Response, NextFunction } from 'express';
import { ProxyService } from '../services/proxy.service';
import { config } from '../config';

/**
 * Hash Generator routes
 */
const router = Router();
const proxyService = new ProxyService(config.services.hash);

/**
 * POST /api/v1/hash/generate
 * Generate hash
 */
router.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/generate', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/hash/compare
 * Compare hash with plain text
 */
router.post('/compare', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await proxyService.forward('/compare', 'POST', req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/hash/health
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
