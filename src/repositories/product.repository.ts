import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import {
  Product,
  ProductAttributes,
  ProductCreationAttributes,
} from '@/models/product';
import {
  CreateProductSchemaType,
  ProductSchemaType,
} from '@/validators/product.validator';

export class ProductRepository {
  async findAll(request: ProductSchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<ProductAttributes> = {};

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

  async create(request: CreateProductSchemaType) {
    return await Product.create({
      name: request.name,
      stock: request.stock,
      price: request.price,
      isActive: true,
    });
  }
}
