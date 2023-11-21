import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaModulesRepository } from './repositories/prisma-modules.repository';
import { PrismaSignsRepository } from './repositories/prisma-signs.repository';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'ISignsRepository',
      useClass: PrismaSignsRepository,
    },
    {
      provide: 'IModulesRepository',
      useClass: PrismaModulesRepository,
    },
    {
      provide: 'IUsersRepository',
      useClass: PrismaUsersRepository,
    },
  ],
  exports: ['ISignsRepository', 'IModulesRepository', 'IUsersRepository'],
})
export class PrismaModule {}
