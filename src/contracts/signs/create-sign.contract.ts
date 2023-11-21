import { z } from 'zod';

export const createSignRequestSchema = z.object({
  name: z.string().min(1),
  image: z.any(),
  isPublished: z.coerce.boolean({ required_error: 'isPublished is required.' }),
});

export type CreateSignRequest = z.infer<typeof createSignRequestSchema>;
