import { Sign as PrismaSign } from '@prisma/client';

import { ISign } from '@app/entities/sign.entity';

export class PrismaSignMapper {
  static toPrisma(data: ISign): PrismaSign {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      isPublished: data.isPublished,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }

  static toDomain(data: PrismaSign): ISign {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      isPublished: data.isPublished,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
