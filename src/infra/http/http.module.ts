import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModulesModule } from '@infra/http/controllers/modules/modules.module';
import { SignsModule } from '@infra/http/controllers/signs/signs.module';
import { JwtJwtService } from '@infra/services/jwt/jwt-jwt.service';

import { AuthModule } from './controllers/auth/auth.module';
import { UsersModule } from './controllers/users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [SignsModule, ModulesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: 'IJwtService',
      useClass: JwtJwtService,
    },
  ],
})
export class HttpModule {}
