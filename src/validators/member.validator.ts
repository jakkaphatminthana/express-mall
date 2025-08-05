import { PaginationSchema } from '@/types/pagination';
import z from 'zod';

// getOne
export const MemberParamSchema = z.object({
  memberId: z.string().transform((val) => Number(val)),
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
