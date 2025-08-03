import { Product } from '@/models';
import { ProductRepository } from '@/repositories/product.repository';
import { PaginationResponse } from '@/types/pagination';
import { createError } from '@/utils/errorUtils';
import {
  CreateProductSchemaType,
  ProductQuerySchemaType,
  UpdateProductSchemaType,
} from '@/validators/product.validator';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(
    request: ProductQuerySchemaType,
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

  async updateProduct(
    productId: number,
    data: UpdateProductSchemaType,
  ): Promise<Product | null> {
    const targetData = await this.productRepository.findById(productId);
    if (!targetData) {
      throw createError.notFound('Product not found');
    }

    const updatedData = await this.productRepository.update(productId, data);
    if (!updatedData) {
      throw createError.badRequest('Update product faild');
    }

    return updatedData;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw createError.notFound('Product not found');
    }

    const canDelete = await this.productRepository.canDelete(id);
    if (!canDelete) {
      throw createError.badRequest(
        'Cannot delete product that has order history',
      );
    }

    const isDeleted = await this.productRepository.delete(id);
    if (!isDeleted) throw new Error('Failed to delete product');
  }
}
