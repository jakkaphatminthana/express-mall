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

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Fetch all products
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductQuery'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorBadRequest'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorInternalServerError'
 */
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
