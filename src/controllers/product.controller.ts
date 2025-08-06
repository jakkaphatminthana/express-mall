import { ControllerBaseFunctionType } from './base.controller';
import { ProductService } from '@/services/product.service';
import { sendError, sendSuccess } from '@/utils/http';
import {
  CreateProductSchemaType,
  ProductQuerySchemaType,
  UpdateProductParamSchemaType,
  UpdateProductSchemaType,
} from '@/validators/product.validator';
import { Response } from 'express';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts: ControllerBaseFunctionType<{}, {}, ProductQuerySchemaType> =
    async (req, res) => {
      try {
        const query = req.query;
        const { data, pagination } =
          await this.productService.getProducts(query);

        return sendSuccess.pagination(res, data, pagination);
      } catch (error) {
        console.error('Error while getProducts: ', error);
        sendError.internalServer(res, error);
      }
    };

  create: ControllerBaseFunctionType<CreateProductSchemaType, {}, {}> = async (
    req,
    res,
  ) => {
    try {
      const body = req.body;
      const result = await this.productService.createProduct(body);

      return sendSuccess.created(res, result);
    } catch (error) {
      console.error('Error while create: ', error);
      sendError.internalServer(res, error);
    }
  };

  update: ControllerBaseFunctionType<
    UpdateProductSchemaType,
    UpdateProductParamSchemaType,
    {}
  > = async (req, res) => {
    try {
      const param = req.params;
      const body = req.body as UpdateProductSchemaType;

      const result = await this.productService.updateProduct(
        param.productId,
        body,
      );

      return sendSuccess.ok(res, result);
    } catch (error) {
      console.error('Error while update: ', error);
      sendError.internalServer(res, error);
    }
  };

  delete: ControllerBaseFunctionType<{}, UpdateProductParamSchemaType, {}> =
    async (req, res) => {
      try {
        const param = req.params;
        await this.productService.deleteProduct(param.productId);

        return sendSuccess.ok(res, undefined, 'Delete Product successful.');
      } catch (error) {
        console.error('Error while delete: ', error);
        sendError.internalServer(res, error);
      }
    };
}
