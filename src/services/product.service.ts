import { Product } from '@/models';
import { ProductRepository } from '@/repositories/product.repository';
import { PaginationResponse } from '@/types/pagination';
import {
  CreateProductSchemaType,
  ProductSchemaType,
} from '@/validators/product.validator';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(
    request: ProductSchemaType,
  ): Promise<PaginationResponse<Product>> {
    const { page = 1, pageSize = 10 } = request;

    const { rows, count } = await this.productRepository.findAll(request);
    const totalPage = Math.ceil(count / pageSize);

    return {
      data: rows.map((item) => item.toJSON()),
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItem: count,
      },
    };
  }

  async createProduct(data: CreateProductSchemaType): Promise<Product> {
    return await this.productRepository.create(data);
  }
}
