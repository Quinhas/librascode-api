import { z } from 'zod';

export const GetModuleByIdParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type GetModuleByIdParams = z.infer<typeof GetModuleByIdParamsSchema>;
