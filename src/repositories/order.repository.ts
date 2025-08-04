import { Order, OrderProduct, Product } from '@/models';
import { Transaction } from 'sequelize';

interface IOrder {
  pointsEarn?: number;
  memberId?: number;
}

export class OrderRepository {
  async findById(id: number): Promise<Order | null> {
    return await Order.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          as: 'orderProducts',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });
  }

  async create(request: IOrder, transaction?: Transaction): Promise<Order> {
    return await Order.create(
      {
        memberId: request.memberId,
        pointsEarn: request.pointsEarn || 0,
      },
      { transaction },
    );
  }

  async updatePoint(id: number, pointsEarn: number, t?: Transaction) {
    const [affectedCount, affectedRows] = await Order.update(
      { pointsEarn },
      { where: { id }, returning: true, transaction: t },
    );

    return affectedRows;
  }
}
