import { ProductRepository } from '@/repositories/product.repository';
import { ProductSchemaType } from '@/validators/product.validator';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(query: ProductSchemaType) {
    const { page = 1, pageSize = 10 } = query;

    const { rows, count } = await this.productRepository.findAll(query);
    const totalPage = Math.ceil(count / pageSize);

    return {
      data: rows.map((item) => item.toJSON()),
      pagination: {
        currentPage: page,
        totalPage,
        totalItem: count,
      },
    };
  }

  async createProduct() {
    return await this.productRepository.create();
  }
}
