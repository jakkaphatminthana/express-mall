import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/connection';
import { Order } from './order';
import { Product } from './product';

interface OrderProductAttributes {
  id: number;
  productId: number;
  orderId: number;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderProductCreationAttributes
  extends Optional<
    OrderProductAttributes,
    'id' | 'amount' | 'unitPrice' | 'totalPrice' | 'createdAt' | 'updatedAt'
  > {}

class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public id!: number;
  public productId!: number;
  public orderId!: number;
  public amount!: number;
  public unitPrice!: number;
  public totalPrice!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // reference
  public static associations: {
    order: Association<OrderProduct, any>;
    product: Association<OrderProduct, any>;
  };
}

OrderProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'quantity must be at least 1',
        },
      },
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "unitPrice can't be negative",
        },
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "totalPrice can't be negative",
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'Order_Products',
    timestamps: true,
    // good performance query
    indexes: [{ fields: ['orderId'] }, { fields: ['productId'] }],
    hooks: {
      beforeSave: async (orderProduct: OrderProduct) => {
        orderProduct.totalPrice = orderProduct.amount * orderProduct.unitPrice;
      },
    },
  },
);

// // Associations
// OrderProduct.belongsTo(Order, {
//   foreignKey: 'orderId',
//   as: 'order',
// });

// OrderProduct.belongsTo(Product, {
//   foreignKey: 'productId',
//   as: 'product',
// });

export { OrderProduct, OrderProductAttributes, OrderProductCreationAttributes };
