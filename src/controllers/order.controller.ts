import { OrderService } from '@/services/order.service';
import { ControllerBaseFunctionType } from './base.controller';
import { CreateOrderSchemaType } from '@/validators/order.validator';
import { sendError } from '@/utils/errorUtils';

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
}
