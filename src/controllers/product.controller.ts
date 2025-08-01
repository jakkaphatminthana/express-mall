import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/services/product.service';

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
    const result = await this.productService.getProducts();

    res.status(200).json({
      data: result.data,
    });
  };
}
