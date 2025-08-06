import { ControllerBaseFunctionType } from './base.controller';
import { OrderService } from '@/services/order.service';
import {
  CreateOrderSchemaType,
  OrderIdParamSchemaType,
  OrdersQuerySchemaType,
} from '@/validators/order.validator';
import { sendError } from '@/utils/errorUtils';
import { toOrderDto } from '@/dto/order.dto';

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

        res.status(201).json({ success: true, data: result });
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

      res.status(200).json({ success: true, data: result });
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
      const result = await this.orderService.findAll(query);

      const formattedListData = result.data.map((item) => toOrderDto(item));

      res
        .status(200)
        .json({ success: true, ...result, data: formattedListData });
    } catch (error) {
      console.error('Error while findAll: ', error);
      sendError.internalServer(res, error);
    }
  };
}
