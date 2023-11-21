import { randomUUID } from 'crypto';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IModule } from '@app/entities/module.entity';
import { ISign } from '@app/entities/sign.entity';
import { AppException } from '@app/exceptions/app.exception';
import { IModulesRepository } from '@app/repositories/modules.repository';
import { ISignsRepository } from '@app/repositories/signs.repository';
import { IFileService } from '@app/services/file.service';
import { CreateModuleRequest } from '@contracts/modules/create-module.contract';

interface ICreateModuleUseCase {
  execute(params: { data: CreateModuleRequest }): Promise<IModule>;
}

@Injectable()
export class CreateModuleUseCase implements ICreateModuleUseCase {
  constructor(
    @Inject('IModulesRepository')
    private readonly modulesRepository: IModulesRepository,
    @Inject('ISignsRepository')
    private readonly signsRepository: ISignsRepository,
    @Inject('FileService')
    private readonly fileService: IFileService,
  ) {}

  async execute({ data }: { data: CreateModuleRequest }): Promise<IModule> {
    const signs: ISign[] = await Promise.all(
      (data.signs ?? []).map(async (id) => {
        const sign = await this.signsRepository.findFirst({ where: { id } });

        if (!sign) {
          throw new AppException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Signal ID '${id}' not found.`,
          });
        }

        return sign;
      }),
    );

    const thumbnailUrl = await this.fileService.uploadFile(data.thumbnail);

    const module: IModule = {
      id: randomUUID(),
      name: data.name,
      thumbnailUrl,
      isPublished: data.isPublished,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      signs,
    };

    await this.modulesRepository.create({ data: module });

    return module;
  }
}
