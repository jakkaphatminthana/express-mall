import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/connection';
import { Order, OrderProduct } from '.';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// auto
interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't be empty",
        },
        len: {
          args: [1, 100],
          msg: 'name must be between 1 and 100 characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1, 255],
          msg: 'description must be between 1 and 255 characters',
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "price can't be negative",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "stock can't be negative",
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
    tableName: 'Products',
    modelName: 'Product',
    timestamps: true,
    // good performance
    indexes: [{ fields: ['name'] }, { fields: ['isActive'] }],
  },
);

// // Associations
// Product.hasMany(OrderProduct, {
//   foreignKey: 'productId',
//   as: 'product',
// });

export default Product;
