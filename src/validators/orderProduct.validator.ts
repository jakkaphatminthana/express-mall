import z from 'zod';

// create
export const CreateOrderProductSchema = z.object({
  productId: z.number({ message: 'productId is required' }),
  amount: z
    .number({ message: 'amount is required' })
    .positive({ message: 'amount must be positive number' }),
});
export type CreateOrderProductSchemaType = z.infer<
  typeof CreateOrderProductSchema
>;
