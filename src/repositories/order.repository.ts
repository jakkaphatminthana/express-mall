import { Member, Order, OrderProduct, Product } from '@/models';
import { Transaction } from 'sequelize';

interface IOrder {
  pointsEarn?: number;
  memberCode?: string;
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
    const member = request.memberCode
      ? await Member.findOne({ where: { code: request.memberCode } })
      : undefined;

    return await Order.create(
      {
        memberId: member?.id,
        pointsEarn: request.pointsEarn || 0,
      },
      { transaction },
    );
  }

  async updatePoint(id: number, pointsEarn: number, t?: Transaction) {
    const [_, affectedRows] = await Order.update(
      { pointsEarn },
      { where: { id }, returning: true, transaction: t },
    );

    return affectedRows;
  }
}
