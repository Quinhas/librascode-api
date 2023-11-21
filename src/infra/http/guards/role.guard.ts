import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IUser } from '@app/entities/user.entity';
import { IUserRoles } from '@app/enums/user-roles.enum';
import { AppException } from '@app/exceptions/app.exception';

import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // eslint-disable-next-line class-methods-use-this
  matchRoles(roles: IUserRoles[], userRoles: IUserRoles[]): boolean {
    return roles.some((role) => userRoles.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as unknown as IUser;

    const matchRoles = this.matchRoles(roles, user.roles);

    if (!matchRoles) {
      throw new AppException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden.',
      });
    }

    return true;
  }
}
