import { Member, Order, OrderProduct, Product } from '@/models';
import { OrdersQuerySchemaType } from '@/validators/order.validator';
import { Op, Transaction, WhereOptions } from 'sequelize';

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

  async findAll(request: OrdersQuerySchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<Order> = {};

    if (request.memberId) {
      whereClause.memberId = request.memberId;
    }

    if (request.startDate || request.endDate) {
      whereClause = {
        ...whereClause,
        createdAt: {
          ...(request.startDate && { [Op.gte]: new Date(request.startDate) }),
          ...(request.endDate && { [Op.lte]: new Date(request.endDate) }),
        },
      };
    }

    return await Order.findAndCountAll({
      where: whereClause,
      include: [{ model: OrderProduct, as: 'orderProducts' }],
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
      distinct: true, //count by order
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
