import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

import validationSchema from '@/middlewares/validation';
import {
  CreateProductSchema,
  ProductQuerySchema,
  UpdateProductParamSchema,
  UpdateProductSchema,
} from '@/validators/product.validator';

const router = Router();
const productController = new ProductController();

router.get(
  '/',
  validationSchema(ProductQuerySchema, 'query'),
  productController.getProducts,
);
router.post(
  '/',
  validationSchema(CreateProductSchema, 'body'),
  productController.create,
);
router.put(
  '/:productId',
  validationSchema(UpdateProductParamSchema, 'params'),
  validationSchema(UpdateProductSchema, 'body'),
  productController.update,
);

router.delete(
  '/:productId',
  validationSchema(UpdateProductParamSchema, 'params'),
  productController.delete,
);

export default router;
