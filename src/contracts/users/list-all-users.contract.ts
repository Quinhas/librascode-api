import { z } from 'zod';

export const ListAllUsersParamsSchema = z.object({
  includeDeleted: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  includeDisabled: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
});

export type ListAllUsersParams = z.infer<typeof ListAllUsersParamsSchema>;
