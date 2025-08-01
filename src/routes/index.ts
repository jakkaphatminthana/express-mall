import { Router, Request, Response } from 'express';

import productRoutes from '@/routes/product.route';

const router = Router();

router.use('/products', productRoutes);

export default router;
