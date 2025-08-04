import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/connection';
import Order from './order';
import PointTransaction from './pointTransaction';

interface MemberAttributes {
  id: number;
  code: string;
  totalPoints: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MemberCreationAttributes
  extends Optional<
    MemberAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'totalPoints'
  > {}

class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  public id!: number;
  public code!: string;
  public totalPoints!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // reference
  public static associations: {
    orders: Association<Member, any>;
    pointTransactions: Association<Member, any>;
  };
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "code can't be empty",
        },
        len: {
          args: [1, 50],
          msg: 'code must be between 1 and 50 characters',
        },
      },
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "totalPoints can't be negative",
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Members',
    timestamps: true,
    // good performance query
    indexes: [{ fields: ['code'] }, { fields: ['isActive'] }],
  },
);

// Associations
// Member.hasMany(Order, { foreignKey: 'memberId', as: 'orders' });

// Member.hasMany(PointTransaction, {
//   foreignKey: 'memberId',
//   as: 'pointTransactions',
// });

Order.belongsTo(Member, {
  foreignKey: 'memberId',
  targetKey: 'id',
  as: 'member',
});

Member.hasMany(Order, {
  foreignKey: 'memberId',
  as: 'orders',
});

PointTransaction.belongsTo(Member, {
  foreignKey: 'memberId',
  targetKey: 'id',
  as: 'members',
});

Member.hasMany(PointTransaction, {
  as: 'pointTransactions',
});

export default Member;
