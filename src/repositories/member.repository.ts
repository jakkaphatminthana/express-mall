import { Op, Transaction, WhereOptions } from 'sequelize';
import { Member, Order, OrderProduct, Product } from '@/models';
import {
  CreateMemberSchemaType,
  MembersQuerySchemaType,
} from '@/validators/member.validator';

export class MemberRepository {
  async findById(id: number): Promise<Member | null> {
    return await Member.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'orders',
          include: [
            {
              model: OrderProduct,
              as: 'orderProducts',
              include: [{ model: Product, as: 'product' }],
            },
          ],
        },
      ],
      order: [[{ model: Order, as: 'orders' }, 'createdAt', 'DESC']],
    });
  }

  async findByCode(code: string): Promise<Member | null> {
    return await Member.findOne({
      where: { code },
      include: [
        {
          model: Order,
          as: 'orders',
          order: [['createdAt', 'DESC']],
        },
      ],
    });
  }

  async findOne(query: any) {
    return Member.findOne(query);
  }

  async findAll(request: MembersQuerySchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<Member> = {};

    //search
    if (request.code) {
      whereClause.code = { [Op.iLike]: `%${request.code}%` };
    }

    // isActive
    if (typeof request.isActive === 'boolean') {
      whereClause.isActive = request.isActive;
    }

    return await Member.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'ASC']],
      limit: pageSize,
      offset,
    });
  }

  async create(request: CreateMemberSchemaType): Promise<Member> {
    return await Member.create({
      code: request.code!,
      totalPoints: request.defaultPoints || 0,
      isActive: true,
    });
  }

  async upsertTotalPoint(
    memberId: number,
    transaction?: Transaction,
  ): Promise<number> {
    const totalPointsResult = await Order.sum('pointsEarn', {
      where: { memberId },
      transaction,
    });

    const totalPoints = totalPointsResult || 0;

    //update
    await Member.update({ totalPoints }, { where: { id: memberId } });

    return totalPoints;
  }

  async delete(id: number): Promise<void> {
    await Member.update({ isActive: false }, { where: { id } });
  }
}
