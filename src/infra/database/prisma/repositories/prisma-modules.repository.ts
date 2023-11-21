import { Injectable } from '@nestjs/common';

import { IModule } from '@app/entities/module.entity';
import {
  IModulesRepository,
  IModulesRepositoryFindFirst,
  IModulesRepositoryUpdate,
} from '@app/repositories/modules.repository';

import { PrismaModuleMapper } from '../mappers/prisma-module.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaModulesRepository implements IModulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ data }: { data: IModule }): Promise<void> {
    const prismaModuleData = PrismaModuleMapper.toPrisma(data);

    await this.prisma.module.create({
      data: {
        ...prismaModuleData,
        signs: {
          createMany: {
            data: (data.signs ?? []).map((sign) => ({
              signId: sign.id,
              createdAt: new Date(),
              updatedAt: null,
              deletedAt: null,
            })),
          },
        },
      },
    });
  }

  async findMany(): Promise<IModule[]> {
    const modules = await this.prisma.module.findMany({ where: {} });

    return modules.map(PrismaModuleMapper.toDomain);
  }

  async findFirst({
    where,
  }: IModulesRepositoryFindFirst): Promise<IModule | null> {
    const module = await this.prisma.module.findFirst({
      where,
      include: {
        signs: {
          select: {
            sign: true,
          },
        },
      },
    });

    if (!module) {
      return null;
    }

    return PrismaModuleMapper.toDomain(module);
  }

  async update({ data, where }: IModulesRepositoryUpdate): Promise<void> {
    const prismaModuleData = PrismaModuleMapper.toPrisma(data);
    await this.prisma.module.update({ data: prismaModuleData, where });
  }
}
