import { z } from 'zod';

export const GetUserByIdParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type GetUserByIdParams = z.infer<typeof GetUserByIdParamsSchema>;
