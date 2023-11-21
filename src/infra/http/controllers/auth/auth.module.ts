import { Module } from '@nestjs/common';

import { SignInUseCase } from '@app/use-cases/auth/sign-in.use-case';
import { SignUpUseCase } from '@app/use-cases/auth/sign-up.use-case';
import { BcryptHashService } from '@infra/services/hash/bcrypt-hash.service';
import { JwtJwtService } from '@infra/services/jwt/jwt-jwt.service';

import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IHashService',
      useClass: BcryptHashService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtJwtService,
    },
    SignUpUseCase,
    SignInUseCase,
  ],
  exports: [],
})
export class AuthModule {}
