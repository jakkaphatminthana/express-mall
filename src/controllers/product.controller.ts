import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/services/product.service';
import { ProductSchemaType } from '@/validators/product.validator';
import { sendError } from '@/utils/errorUtils';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const query = req.query as ProductSchemaType;
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

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.productService.createProduct();

    res.status(201).json({
      data: result,
    });
  };
}
