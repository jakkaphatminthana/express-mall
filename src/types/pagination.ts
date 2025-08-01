import z from 'zod';

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPage: number;
    totalItem: number;
  };
}

export const PaginationSchema = z.object({
  page: z
    .preprocess((val) => {
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return val.toString();
      return val;
    }, z.string())
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'page must be a positive number' })
    .optional(),
  pageSize: z
    .preprocess((val) => {
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return val.toString();
      return val;
    }, z.string())
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'pageSize must be a positive number' })
    .optional(),
  search: z.string().optional(),
});
