import { Request, Response, NextFunction } from 'express';
import { sendError } from '@/utils/errorUtils';

import { ProductService } from '@/services/product.service';
import {
  CreateProductSchemaType,
  ProductSchemaType,
} from '@/validators/product.validator';
import { ControllerBaseFunctionType } from './base.controller';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts: ControllerBaseFunctionType<{}, {}, ProductSchemaType> = async (
    req,
    res,
  ) => {
    try {
      const query = req.query;
      const result = await this.productService.getProducts(query);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error while getProducts: ', error);
      sendError.internalServer(res, error);
    }
  };

  create: ControllerBaseFunctionType<CreateProductSchemaType, {}, {}> = async (
    req,
    res,
  ): Promise<void> => {
    try {
      const body = req.body;
      const result = await this.productService.createProduct(body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error while getProducts: ', error);
      sendError.internalServer(res, error);
    }
  };
}
