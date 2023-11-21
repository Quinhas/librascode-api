import {
  Module as PrismaRawModule,
  Sign as PrismaRawSign,
} from '@prisma/client';

import { IModule } from '@app/entities/module.entity';

import { PrismaSignMapper } from './prisma-sign.mapper';

interface IPrismaModule extends PrismaRawModule {
  signs?: {
    sign: PrismaRawSign;
  }[];
}

export class PrismaModuleMapper {
  static toPrisma(data: IModule): PrismaRawModule {
    return {
      id: data.id,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: data.isPublished,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }

  static toDomain(data: IPrismaModule): IModule {
    return {
      id: data.id,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: data.isPublished,
      signs: data.signs?.map((sign) => PrismaSignMapper.toDomain(sign.sign)),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
