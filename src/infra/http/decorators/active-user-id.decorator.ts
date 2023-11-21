import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { id } = request.user as unknown as IUser;

    if (!id) {
      throw new UnauthorizedException();
    }

    return id;
  },
);
