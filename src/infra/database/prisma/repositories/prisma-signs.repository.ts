import { Injectable } from '@nestjs/common';

import { ISign } from '@app/entities/sign.entity';
import {
  ISignsRepository,
  ISignsRepositoryFindFirst,
} from '@app/repositories/signs.repository';

import { PrismaSignMapper } from '../mappers/prisma-sign.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSignsRepository implements ISignsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ data }: { data: ISign }): Promise<void> {
    const prismaSignData = PrismaSignMapper.toPrisma(data);
    await this.prisma.sign.create({ data: prismaSignData });
  }

  async findMany(): Promise<ISign[]> {
    const signs = await this.prisma.sign.findMany({ where: {} });

    return signs.map(PrismaSignMapper.toDomain);
  }

  async findFirst({ where }: ISignsRepositoryFindFirst): Promise<ISign | null> {
    const sign = await this.prisma.sign.findFirst({ where });

    if (!sign) {
      return null;
    }

    return PrismaSignMapper.toDomain(sign);
  }
}
