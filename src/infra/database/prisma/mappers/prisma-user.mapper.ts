import { User as PrismaUser } from '@prisma/client';

import { IUser } from '@app/entities/user.entity';
import { IUserRoles } from '@app/enums/user-roles.enum';

export class PrismaUserMapper {
  static toPrisma(data: IUser): PrismaUser {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      isDisabled: data.isDisabled,
      roles: data.roles,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }

  static toDomain(data: PrismaUser): IUser {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      roles: data.roles.map((role) => IUserRoles[role]),
      isDisabled: data.isDisabled,
      favoriteModules: [],
      favoriteSigns: [],

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
