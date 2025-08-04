import { Member, Order } from '@/models';
import { MembersQuerySchemaType } from '@/validators/member.validator';
import { Op, Transaction, WhereOptions } from 'sequelize';

export class MemberRepository {
  async findById(id: number): Promise<Member | null> {
    return await Member.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'orders',
          order: [['createdAt', 'DESC']],
        },
      ],
    });
  }

  async findAll(request: MembersQuerySchemaType) {
    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const offset = (page - 1) * pageSize;

    let whereClause: WhereOptions<Member> = {};

    //search
    if (request.code) {
      whereClause = {
        [Op.or]: [{ code: { [Op.iLike]: `${request.code}%` } }],
      };
    }

    // isActive
    if (typeof request.isActive === 'boolean') {
      whereClause = {
        [Op.or]: [{ isActive: request.isActive }],
      };
    }

    return await Member.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'ASC']],
      limit: pageSize,
      offset,
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
}
