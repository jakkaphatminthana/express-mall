import { Member } from './member';
import { Order } from './order';
import { OrderProduct } from './orderProduct';
import { PointTransaction } from './pointTransaction';
import { Product } from './product';

// Many to Many (Connect Order - Product by OrderProduct)
Order.belongsToMany(Product, {
  through: OrderProduct, // center model
  foreignKey: 'orderId', // FK from orderProdcut to order
  otherKey: 'productId', // FK from orderProdcut to product
  as: 'product',
});

// Many to Many (Connect Order - Product by OrderProduct)
Product.belongsToMany(Order, {
  through: OrderProduct, // center model
  foreignKey: 'productId', // FK from orderProdcut to product
  otherKey: 'orderId', // FK from orderProdcut to order
  as: 'order',
});

// Associations
OrderProduct.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

OrderProduct.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export { Product, Member, Order, OrderProduct, PointTransaction };
