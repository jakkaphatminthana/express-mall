import z from 'zod';
import { CreateOrderProductSchema } from './orderProduct.validator';
import { PaginationSchema } from '@/types/pagination';

//YYYY-MM-dd
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// create
export const CreateOrderSchema = z.object({
  memberCode: z.string().optional(),
  orderProducts: z
    .array(CreateOrderProductSchema)
    .min(1, { message: 'orderProducts must has more than 1 item' }),
});
export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;

// orderId param
export const OrderIdParamSchema = z.object({
  orderId: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'orderId must be number',
    })
    .transform((val) => Number(val)),
});
export type OrderIdParamSchemaType = z.infer<typeof OrderIdParamSchema>;

// order all
export const OrdersQuerySchema = PaginationSchema.omit({ search: true }).extend(
  {
    memberId: z
      .string()
      .refine((val) => !isNaN(Number(val)), {
        message: 'memberId must be number',
      })
      .transform((val) => Number(val))
      .optional(),
    startDate: z
      .string()
      .regex(dateRegex, { message: 'startDate must be in YYYY-MM-DD format' })
      .optional(),
    endDate: z
      .string()
      .regex(dateRegex, { message: 'endDate must be in YYYY-MM-DD format' })
      .optional(),
  },
);
export type OrdersQuerySchemaType = z.infer<typeof OrdersQuerySchema>;
