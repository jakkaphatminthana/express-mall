import { Op, WhereOptions } from 'sequelize';
import {
  CreateProductSchemaType,
  ProductQuerySchemaType,
  UpdateProductSchemaType,
} from '@/validators/product.validator';

import { Product, OrderProduct } from '@/models';
import { createError } from '@/utils/errorUtils';

export class ProductRepository {
  async findAll(request: ProductQuerySchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions = {};

    // search
    if (request.search) {
      whereClause = {
        [Op.or]: [{ name: { [Op.iLike]: `%${request.search}%` } }],
      };
    }

    // isActive
    if (typeof request.isActive === 'boolean') {
      whereClause = {
        [Op.or]: [{ isActive: request.isActive }],
      };
    }

    return await Product.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
    });
  }

  async findById(id: number): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  async create(request: CreateProductSchemaType): Promise<Product> {
    return await Product.create({
      name: request.name,
      stock: request.stock,
      price: request.price,
      isActive: true,
    });
  }

  async update(
    productId: number,
    request: UpdateProductSchemaType,
  ): Promise<Product | null> {
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

  async delete(id: number): Promise<boolean> {
    const [affectedRows] = await Product.update(
      { isActive: false },
      { where: { id }, returning: true },
    );

    return affectedRows > 0;
  }

  async canDelete(id: number): Promise<boolean> {
    const orderCounts = await OrderProduct.count({ where: { productId: id } });
    return orderCounts === 0;
  }

  async checkStock(id: number, requiredAmount: number): Promise<boolean> {
    const product = await this.findById(id);
    if (!product) return false;

    return product.stock >= requiredAmount && product.isActive;
  }

  async reduceStock(id: number, amount: number): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    if (product.stock < amount) {
      throw createError.badRequest('Insufficient stock');
    }

    const newStock = product.stock - amount;
    return await this.update(id, { stock: newStock });
  }
}
