import { PaginationSchema } from '@/types/pagination';
import z from 'zod';

// getOne
export const MemberParamSchema = z.object({
  memberId: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'memberId must be number',
    })
    .transform((val) => Number(val)),
});
export type MemberParamSchemaType = z.infer<typeof MemberParamSchema>;

// getAll
export const MembersQuerySchema = PaginationSchema.omit({
  search: true,
}).extend({
  code: z.string().optional(),
  isActive: z.coerce
    .boolean({ message: 'isActive must be a valid boolean (true/false)' })
    .optional(),
});
export type MembersQuerySchemaType = z.infer<typeof MembersQuerySchema>;

// create
export const CreateMemberSchema = z.object({
  code: z.string().optional(),
  defaultPoints: z
    .number()
    .positive({ message: 'defaultPoints must be not negative' })
    .optional(),
});
export type CreateMemberSchemaType = z.infer<typeof CreateMemberSchema>;
