import { sequelize } from '@/config/connection';
import { toOrderDto } from '@/dto/order.dto';

import { MemberRepository } from '@/repositories/member.repository';
import { OrderRepository } from '@/repositories/order.repository';
import { OrderProductRepository } from '@/repositories/orderProduct.repository';
import { ProductRepository } from '@/repositories/product.repository';

import { POINT_RATE } from '@/utils/constants';
import { createError } from '@/utils/errorUtils';

import {
  CreateOrderSchemaType,
  OrdersQuerySchemaType,
} from '@/validators/order.validator';

export class OrderService {
  private orderRepository: OrderRepository;
  private orderProductRepository: OrderProductRepository;
  private productRepository: ProductRepository;
  private memberRepository: MemberRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderProductRepository = new OrderProductRepository();
    this.productRepository = new ProductRepository();
    this.memberRepository = new MemberRepository();
  }

  async createOrder(request: CreateOrderSchemaType) {
    try {
      return await sequelize.transaction(async (t) => {
        let totalPoints = 0;
        let totalOrderPrice = 0;

        // check product
        for (const item of request.orderProducts) {
          const product = await this.productRepository.findById(item.productId);
          if (!product) {
            throw createError.notFound(`Product "${item.productId}" not found`);
          }

          if (!product.isActive) {
            throw createError.badRequest(
              `Product "${item.productId}" is not active`,
            );
          }

          const hasStock = await this.productRepository.checkStock(
            item.productId,
            item.amount,
          );
          if (!hasStock) {
            throw createError.conflict(
              `Product "${product.name}" is insufficient stock`,
            );
          }

          const priceTotal = product.price * item.amount;
          totalOrderPrice += priceTotal;
        }

        totalPoints = Math.floor(totalOrderPrice / POINT_RATE);

        // create Order
        const order = await this.orderRepository.create(
          {
            memberCode: request.memberCode,
            pointsEarn: totalPoints,
          },
          t,
        );

        // create OrderProduct
        const orderProductData = await this.orderProductRepository.create(
          order.id,
          request.orderProducts,
          t,
        );

        // reduce stock for all product
        for (const item of orderProductData) {
          await this.productRepository.reduceStock(item.productId, item.amount);
        }

        // upsert member point
        if (request.memberCode) {
          const member = await this.memberRepository.findByCode(
            request.memberCode,
          );
          if (!member) {
            throw createError.badRequest('Member code is invalid');
          }
          if (!member.isActive) {
            throw createError.conflict('Member is not available');
          }

          await this.memberRepository.upsertTotalPoint(member.id, t);
        }

        return order;
      });
    } catch (error) {
      console.error('Error while service createOrder:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    return await this.orderRepository.findById(id);
  }

  async findAll(request: OrdersQuerySchemaType) {
    const { page = 1, pageSize = 10 } = request;

    const { rows, count } = await this.orderRepository.findAll(request);
    const totalPage = Math.ceil(count / pageSize);

    return {
      data: rows.map((item) => item.toJSON()),
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItem: count,
      },
    };
  }
}
