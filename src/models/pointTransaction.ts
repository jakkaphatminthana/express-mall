import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/connection';
import { Member } from './member';
import { Order } from './order';

interface PointTransactionAttributes {
  id: number;
  memberId: number;
  orderId: number;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// auto
interface PointTransactionCreationAttributes
  extends Optional<
    PointTransactionAttributes,
    'id' | 'points' | 'createdAt' | 'updatedAt'
  > {}

class PointTransaction
  extends Model<PointTransactionAttributes, PointTransactionCreationAttributes>
  implements PointTransactionAttributes
{
  public id!: number;
  public memberId!: number;
  public orderId!: number;
  public points!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // reference
  public static associations: {
    member: Association<PointTransaction, any>;
    order: Association<PointTransaction, any>;
  };
}

PointTransaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Members',
        key: 'id',
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "pointsEarn can't be negative",
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'Point_Transactions',
    timestamps: true,
    // good performance query
    indexes: [
      { fields: ['memberId'] },
      { fields: ['orderId'] },
      { fields: ['createdAt'] },
    ],
  },
);

// Associations
PointTransaction.belongsTo(Member, {
  foreignKey: 'memberId',
  as: 'member',
});

PointTransaction.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

export {
  PointTransaction,
  PointTransactionAttributes,
  PointTransactionCreationAttributes,
};
