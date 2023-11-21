import { z } from 'zod';

import { IUserRoles } from '@app/enums/user-roles.enum';

export const CreateUserDtoSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1),
  email: z.string().min(1).email('Invalid email.'),
  password: z.string({ required_error: 'Password is required.' }).min(1),
  isDisabled: z.boolean().default(false),
  roles: z.array(
    z.nativeEnum(IUserRoles, {
      invalid_type_error: 'Invalid role.',
      required_error: 'Role is required.',
    }),
    {
      required_error: 'Roles are required.',
      invalid_type_error: 'Roles must be an array.',
    },
  ),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
