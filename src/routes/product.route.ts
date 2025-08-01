import { ProductController } from '@/controllers/product.controller';
import { Router } from 'express';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/', productController.create);

export default router;
