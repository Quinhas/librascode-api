import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IJwtService } from '@app/services/jwt.service';

import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IJwtService')
    private jwtService: IJwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verify(token);

      request.user = {
        id: payload.id,
        roles: payload.roles,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as unknown as { authorization?: string };
    const [type, token] = headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
