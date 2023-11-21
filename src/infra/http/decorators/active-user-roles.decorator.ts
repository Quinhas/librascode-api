import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';

export const ActiveUserRoles = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { roles } = request.user as unknown as IUser;

    if (!roles) {
      throw new UnauthorizedException();
    }

    return roles;
  },
);
