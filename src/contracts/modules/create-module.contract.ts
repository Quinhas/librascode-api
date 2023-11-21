import { z } from 'zod';

export const createModuleRequestSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.any(),
  isPublished: z.coerce.boolean({ required_error: 'isPublished is required.' }),
  signs: z.array(z.string().uuid()).optional(),
});

export type CreateModuleRequest = z.infer<typeof createModuleRequestSchema>;
