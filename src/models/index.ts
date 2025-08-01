import Order from './order';
import Product from './product';
import Member from './member';
import OrderProduct from './orderProduct';
import PointTransaction from './pointTransaction';

// Product.hasMany(OrderProduct, {
//   foreignKey: 'productId',
//   as: 'orderProducts',
// });

// OrderProduct.belongsTo(Product, {
//   foreignKey: 'productId',
//   as: 'product',
// });

export { Product, Order, Member, OrderProduct, PointTransaction };
