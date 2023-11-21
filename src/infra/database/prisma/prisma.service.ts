import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { env } from '@infra/env';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [],
      errorFormat: env.NODE_ENV === 'production' ? 'minimal' : 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
