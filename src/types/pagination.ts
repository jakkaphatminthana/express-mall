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
  page: z.coerce
    .number({ message: 'page must be a positive number' })
    .int()
    .positive()
    .optional(),
  pageSize: z.coerce
    .number({ message: 'pageSize must be a positive number' })
    .int()
    .positive()
    .optional(),
  search: z.string().optional(),
});
