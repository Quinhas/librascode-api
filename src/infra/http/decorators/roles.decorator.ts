import { Reflector } from '@nestjs/core';

import { IUserRoles } from '@app/enums/user-roles.enum';

export const Roles = Reflector.createDecorator<IUserRoles[]>();
