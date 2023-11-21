import { z } from 'zod';

export const signUpRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255).email('Invalid email.'),
  password: z.string().min(1),
});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;
