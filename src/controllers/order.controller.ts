import { ControllerBaseFunctionType } from './base.controller';
import { OrderService } from '@/services/order.service';
import {
  CreateOrderSchemaType,
  OrderIdParamSchemaType,
  OrdersQuerySchemaType,
} from '@/validators/order.validator';
import { toOrderDto } from '@/dto/order.dto';
import { sendError, sendSuccess } from '@/utils/http';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createOrder: ControllerBaseFunctionType<CreateOrderSchemaType, {}, {}> =
    async (req, res) => {
      try {
        const body = req.body;
        const result = await this.orderService.createOrder(body);

        return sendSuccess.created(res, result);
      } catch (error) {
        console.error('Error while createOrder: ', error);
        sendError.internalServer(res, error);
      }
    };

  findOne: ControllerBaseFunctionType<{}, OrderIdParamSchemaType, {}> = async (
    req,
    res,
  ) => {
    try {
      const params = req.params;
      const result = await this.orderService.findOne(params.orderId);

      if (!result) {
        sendError.notFound(res, 'Order not found');
        return;
      }

      return sendSuccess.ok(res, result);
    } catch (error) {
      console.error('Error while findOne: ', error);
      sendError.internalServer(res, error);
    }
  };

  findAll: ControllerBaseFunctionType<{}, {}, OrdersQuerySchemaType> = async (
    req,
    res,
  ) => {
    try {
      const query = req.query;
      const { data, pagination } = await this.orderService.findAll(query);

      const formattedListData = data.map((item) => toOrderDto(item));

      return sendSuccess.pagination(res, formattedListData, pagination);
    } catch (error) {
      console.error('Error while findAll: ', error);
      sendError.internalServer(res, error);
    }
  };
}
