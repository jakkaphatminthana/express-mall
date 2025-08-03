import { Op, WhereOptions } from 'sequelize';
import {
  CreateProductSchemaType,
  ProductSchemaType,
  UpdateProductSchemaType,
} from '@/validators/product.validator';

import { Product } from '@/models';

export class ProductRepository {
  async findAll(request: ProductSchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<Product> = {};

    if (request.search) {
      whereClause = {
        [Op.or]: [{ name: { [Op.iLike]: `%${request.search}%` } }],
      };
    }

    return await Product.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
    });
  }

  async findById(id: number) {
    return await Product.findByPk(id);
  }

  async create(request: CreateProductSchemaType) {
    return await Product.create({
      name: request.name,
      stock: request.stock,
      price: request.price,
      isActive: true,
    });
  }

  async update(productId: number, request: UpdateProductSchemaType) {
    const [affectedRows] = await Product.update(
      {
        name: request.name,
        stock: request.stock,
        price: request.price,
      },
      {
        where: { id: productId },
        returning: true,
      },
    );

    if (affectedRows === 0) return null;

    return this.findById(productId);
  }
}
