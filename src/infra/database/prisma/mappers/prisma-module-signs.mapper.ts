import { ModuleSigns as PrismaModuleSigns } from '@prisma/client';

import { IModuleSigns } from '@app/entities/module-signs.entity';

export class PrismaModuleSignsMapper {
  static toPrisma(data: IModuleSigns): PrismaModuleSigns {
    return {
      moduleId: data.moduleId,
      signId: data.signId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }

  static toDomain(data: PrismaModuleSigns): IModuleSigns {
    return {
      moduleId: data.moduleId,
      signId: data.signId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
