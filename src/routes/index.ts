import { Router, Request, Response } from 'express';

import productRoutes from '@/routes/product.route';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productRoutes);

export default router;
