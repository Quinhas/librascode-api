import { Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import {
  IUsersRepository,
  IUsersRepositoryCreate,
  IUsersRepositoryFindFirst,
  IUsersRepositoryFindMany,
  IUsersRepositoryUpdate,
} from '@app/repositories/users.repository';

import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst({ where }: IUsersRepositoryFindFirst): Promise<IUser | null> {
    const { id, name, email } = where;

    const user = await this.prisma.user.findFirst({
      where: {
        id,
        name,
        email,
      },
      include: {
        favoriteModules: {
          include: {
            module: true,
            user: false,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findMany(params: IUsersRepositoryFindMany): Promise<IUser[]> {
    let { where } = params;
    const { includeDeleted, includeDisabled } = params;

    if (!includeDeleted) {
      where = {
        ...where,
        deletedAt: { equals: null },
      };
    }

    if (!includeDisabled) {
      where = {
        ...where,
        isDisabled: { equals: false },
      };
    }

    const users = await this.prisma.user.findMany({
      where,
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  async create({ data }: IUsersRepositoryCreate): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(data);
    await this.prisma.user.create({ data: prismaUserData });
  }

  async update({ where, data }: IUsersRepositoryUpdate): Promise<void> {
    const { id } = where;
    const prismaUserData = PrismaUserMapper.toPrisma(data);

    await this.prisma.user.update({ where: { id }, data: prismaUserData });
  }
}
