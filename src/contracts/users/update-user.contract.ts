import { z } from 'zod';

import { CreateUserDtoSchema } from './create-user.contract';

export const UpdateUserParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>;

export const UpdateUserDtoSchema = CreateUserDtoSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
