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
 * GET /products
 * @tags [Products]
 * @summary Get all products
 * @description get products
 * @param {string} page.query - page - page number
 * @param {string} pageSize.query - pageSize - number of items per page
 * @param {string} search.query - search - search keyword
 * @param {boolean} isActive.query - isActive - filter by active status
 * @return {ListProductsResponse} 200 - Success response - application/json
 * @return {ErrorResponse} 500 - Internal server error - application/json
 * @example response - 500 - Internal Server Error
 * {
 *   "success": false,
 *   "error": {
 *     "message": "Internal server error",
 *     "code": "INTERNAL_SERVER_ERROR",
 *     "details": "Error details if available"
 *   }
 * }
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
