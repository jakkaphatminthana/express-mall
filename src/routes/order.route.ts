import { OrderController } from '@/controllers/order.controller';
import validationSchema from '@/middlewares/validation';
import {
  CreateOrderSchema,
  OrderIdParamSchema,
  OrdersQuerySchema,
} from '@/validators/order.validator';
import { Router } from 'express';

const router = Router();
const orderController = new OrderController();

router.post(
  '/',
  validationSchema(CreateOrderSchema, 'body'),
  orderController.createOrder,
);

router.get(
  '/:orderId',
  validationSchema(OrderIdParamSchema, 'params'),
  orderController.findOne,
);

router.get(
  '/',
  validationSchema(OrdersQuerySchema, 'query'),
  orderController.findAll,
);

export default router;
