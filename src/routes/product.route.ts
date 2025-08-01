import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

import validationSchema from '@/middlewares/validation';
import {
  CreateProductSchema,
  ProductSchema,
} from '@/validators/product.validator';

const router = Router();
const productController = new ProductController();

router.get(
  '/',
  validationSchema(ProductSchema, 'query'),
  productController.getProducts,
);
router.post(
  '/',
  validationSchema(CreateProductSchema, 'body'),
  productController.create,
);

export default router;
