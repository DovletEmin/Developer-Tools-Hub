import { Router } from 'express';
import formatterRoutes from './formatter.routes';
import jwtRoutes from './jwt.routes';
import hashRoutes from './hash.routes';
import converterRoutes from './converter.routes';

/**
 * Main router combining all service routes
 */
const router = Router();

router.use('/formatter', formatterRoutes);
router.use('/jwt', jwtRoutes);
router.use('/hash', hashRoutes);
router.use('/converter', converterRoutes);

export default router;
