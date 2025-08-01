import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import {
  Product,
  ProductAttributes,
  ProductCreationAttributes,
} from '@/models/product';
import { ProductSchemaType } from '@/validators/product.validator';

export class ProductRepository {
  async findAll(query: ProductSchemaType) {
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<ProductAttributes> = {};

    if (query.search) {
      whereClause = {
        [Op.or]: [{ name: { [Op.iLike]: `%${query.search}%` } }],
      };
    }

    return await Product.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
    });
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
