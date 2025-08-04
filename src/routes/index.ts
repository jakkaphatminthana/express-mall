import { Router, Request, Response } from 'express';

import productRoutes from '@/routes/product.route';
import orderRoutes from '@/routes/order.route';
import memberRoutes from '@/routes/member.route';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/members', memberRoutes);

export default router;
