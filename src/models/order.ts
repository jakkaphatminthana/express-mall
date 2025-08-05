import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/connection';

interface OrderAttributes {
  id: number;
  memberId?: number;
  pointsEarn: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// auto
interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    'id' | 'pointsEarn' | 'createdAt' | 'updatedAt'
  > {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public memberId?: number;
  public pointsEarn!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    member: Association<Order, any>;
    orderProducts: Association<Order, any>;
    pointTransaction: Association<Order, any>;
  };
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'memberId',
      references: {
        model: 'Members',
        key: 'id',
      },
    },
    pointsEarn: {
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
    tableName: 'Orders',
    timestamps: true,
    // good performance query
    indexes: [{ fields: ['memberId'] }, { fields: ['createdAt'] }],
  },
);

export default Order;
