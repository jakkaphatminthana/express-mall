import z from 'zod';
import { CreateOrderProductSchema } from './orderProduct.validator';

// create
export const CreateOrderSchema = z.object({
  memberId: z.number().optional(),
  orderProducts: z
    .array(CreateOrderProductSchema)
    .min(1, { message: 'orderProducts must has more than 1 item' }),
});
export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;
