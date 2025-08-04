import { OrderController } from '@/controllers/order.controller';
import validationSchema from '@/middlewares/validation';
import { CreateOrderSchema } from '@/validators/order.validator';
import { Router } from 'express';

const router = Router();
const orderController = new OrderController();

router.post(
  '/',
  validationSchema(CreateOrderSchema, 'body'),
  orderController.createOrder,
);

export default router;
