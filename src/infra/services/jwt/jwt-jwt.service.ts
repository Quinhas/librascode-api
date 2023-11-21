/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { IJwtPayload, IJwtService } from '@app/services/jwt.service';
import { env } from '@infra/env';

@Injectable()
export class JwtJwtService implements IJwtService {
  async sign({ id, roles }: IJwtPayload): Promise<string> {
    return sign(
      {
        id,
        roles,
      },
      env.JWT_SECRET,
      { expiresIn: '24h' },
    );
  }

  async verify(token: string): Promise<IJwtPayload> {
    return verify(token, env.JWT_SECRET) as unknown as IJwtPayload;
  }
}
