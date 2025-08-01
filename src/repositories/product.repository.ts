import { Op, WhereOptions } from 'sequelize';
import {
  Product,
  ProductAttributes,
  ProductCreationAttributes,
} from '@/models/product';

export class ProductRepository {
  async findAll() {
    const page = 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async create() {
    return await Product.create({
      name: 'test create',
      stock: 10,
      price: 3000,
      isActive: true,
    });
  }
}
