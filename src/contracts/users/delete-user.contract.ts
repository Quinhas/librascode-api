import { z } from 'zod';

export const DeleteUserParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type DeleteUserParams = z.infer<typeof DeleteUserParamsSchema>;
