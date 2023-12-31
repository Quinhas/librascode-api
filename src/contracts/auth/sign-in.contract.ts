import { z } from 'zod';

export const signInRequestSchema = z.object({
  email: z.string().min(1).email('Invalid email.'),
  password: z.string().min(1),
});

export type SignInRequest = z.infer<typeof signInRequestSchema>;
