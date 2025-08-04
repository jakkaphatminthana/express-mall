import { sequelize } from '@/config/connection';
import { OrderRepository } from '@/repositories/order.repository';
import { OrderProductRepository } from '@/repositories/orderProduct.repository';
import { POINT_RATE } from '@/utils/constants';
import { createError } from '@/utils/errorUtils';
import { CreateOrderSchemaType } from '@/validators/order.validator';

export class OrderService {
  private orderRepository: OrderRepository;
  private orderProductRepository: OrderProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderProductRepository = new OrderProductRepository();
  }

  async createOrder(request: CreateOrderSchemaType) {
    try {
      return await sequelize.transaction(async (t) => {
        // create Order
        const order = await this.orderRepository.create(
          {
            memberId: request.memberId,
            pointsEarn: 0,
          },
          t,
        );
        await order.save({ transaction: t });

        // create OrderProduct
        const orderProducts = await this.orderProductRepository.create(
          order.id,
          request.orderProducts,
          t,
        );

        // update point
        const totalPrice = orderProducts
          .map((item) => item.totalPrice)
          .reduce((sum, price) => sum + price, 0);

        const pointsEarn = Math.floor(totalPrice / POINT_RATE);

        const orderUpdated = await this.orderRepository.updatePoint(
          order.id,
          pointsEarn,
          t,
        );

        if (!orderUpdated) {
          throw createError.badRequest('Error while updating order points');
        }

        return orderUpdated;
      });
    } catch (error) {
      console.error('Error while service createOrder:', error);
      throw createError.internal(undefined, error as any);
    }
  }
}
