import { OrderProduct, Product } from '@/models';
import { Transaction } from 'sequelize';
import { createError } from '@/utils/errorUtils';
import { CreateOrderProductSchemaType } from '@/validators/orderProduct.validator';

export class OrderProductRepository {
  async create(
    orderId: number,
    request: CreateOrderProductSchemaType[],
    t?: Transaction,
  ) {
    const records = await Promise.all(
      request.map(async (p) => {
        const product = await Product.findByPk(p.productId);
        if (!product) {
          throw createError.notFound('Product not found');
        }

        return {
          productId: p.productId,
          orderId,
          amount: p.amount,
          unitPrice: product.price,
          totalPrice: product.price * p.amount,
        };
      }),
    );

    return await OrderProduct.bulkCreate(records, { transaction: t });
  }
}
