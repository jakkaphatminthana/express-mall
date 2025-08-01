import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

import validationSchema from '@/middlewares/validation';
import { ProductSchema } from '@/validators/product.validator';

const router = Router();
const productController = new ProductController();

router.get(
  '/',
  validationSchema(ProductSchema, 'query'),
  productController.getProducts,
);
router.post('/', productController.create);

export default router;
