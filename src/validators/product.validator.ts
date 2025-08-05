import { PaginationSchema } from '@/types/pagination';
import z from 'zod';

// create
export const CreateProductSchema = z.object({
  name: z
    .string({ message: 'name is required' })
    .max(100, { message: 'name must be less than 100 characters' }),
  description: z
    .string()
    .max(255, { message: 'description must be less than 255 characters' })
    .optional(),
  price: z
    .number({ message: 'price is required' })
    .min(0, { message: "price can't be nagative" }),
  stock: z
    .number({ message: 'stock is required' })
    .min(0, { message: "stock can't be nagative" }),
});
export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;

// getAll
export const ProductQuerySchema = PaginationSchema.extend({
  isActive: z.coerce
    .boolean({ message: 'isActive must be a valid boolean (true/false)' })
    .optional(),
});
export type ProductQuerySchemaType = z.infer<typeof ProductQuerySchema>;

// update body
export const UpdateProductSchema = z.object({
  name: z
    .string({ message: 'name is required' })
    .max(100, { message: 'name must be less than 100 characters' })
    .optional(),
  description: z
    .string()
    .max(255, { message: 'description must be less than 255 characters' })
    .optional(),
  price: z
    .number({ message: 'price is required' })
    .min(0, { message: "price can't be nagative" })
    .optional(),
  stock: z
    .number({ message: 'stock is required' })
    .min(0, { message: "stock can't be nagative" })
    .optional(),
});
export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;

//update param
export const UpdateProductParamSchema = z.object({
  productId: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'productId must be number',
    })
    .transform((val) => Number(val)),
});
export type UpdateProductParamSchemaType = z.infer<
  typeof UpdateProductParamSchema
>;
