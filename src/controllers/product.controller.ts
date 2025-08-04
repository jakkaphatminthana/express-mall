import { sendError } from '@/utils/errorUtils';
import { ProductService } from '@/services/product.service';
import {
  CreateProductSchemaType,
  ProductQuerySchemaType,
  UpdateProductParamSchemaType,
  UpdateProductSchemaType,
} from '@/validators/product.validator';
import { ControllerBaseFunctionType } from './base.controller';
import { toBoolean } from '@/utils/convert';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts: ControllerBaseFunctionType<{}, {}, ProductQuerySchemaType> =
    async (req, res) => {
      try {
        const query = req.query;
        const isActive = toBoolean(req.query.isActive);

        const result = await this.productService.getProducts({
          ...query,
          isActive,
        });

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
      console.error('Error while create: ', error);
      sendError.internalServer(res, error);
    }
  };

  update: ControllerBaseFunctionType<
    UpdateProductSchemaType,
    UpdateProductParamSchemaType,
    {}
  > = async (req, res): Promise<void> => {
    try {
      const param = req.params;
      const body = req.body as UpdateProductSchemaType;

      const result = await this.productService.updateProduct(
        param.productId,
        body,
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error while update: ', error);
      sendError.internalServer(res, error);
    }
  };

  delete: ControllerBaseFunctionType<{}, UpdateProductParamSchemaType, {}> =
    async (req, res): Promise<void> => {
      try {
        const param = req.params;
        await this.productService.deleteProduct(param.productId);

        res.status(200).json({
          success: true,
          message: 'Delete Product successful.',
        });
      } catch (error) {
        console.error('Error while delete: ', error);
        sendError.internalServer(res, error);
      }
    };
}
