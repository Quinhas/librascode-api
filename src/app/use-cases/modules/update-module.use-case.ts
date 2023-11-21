import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IModule } from '@app/entities/module.entity';
import { ISign } from '@app/entities/sign.entity';
import { AppException } from '@app/exceptions/app.exception';
import { IModulesRepository } from '@app/repositories/modules.repository';
import { ISignsRepository } from '@app/repositories/signs.repository';
import { IFileService } from '@app/services/file.service';
import {
  UpdateModuleDto,
  UpdateModuleParams,
} from '@contracts/modules/update-module.contract';

interface IUpdateModuleUseCase {
  execute(params: {
    where: UpdateModuleParams;
    data: UpdateModuleDto;
  }): Promise<IModule>;
}

@Injectable()
export class UpdateModuleUseCase implements IUpdateModuleUseCase {
  constructor(
    @Inject('IModulesRepository')
    private readonly modulesRepository: IModulesRepository,
    @Inject('ISignsRepository')
    private readonly signsRepository: ISignsRepository,
    @Inject('FileService')
    private readonly fileService: IFileService,
  ) {}

  async execute({
    data,
    where,
  }: {
    where: UpdateModuleParams;
    data: UpdateModuleDto;
  }): Promise<IModule> {
    const module = await this.modulesRepository.findFirst({ where });

    if (!module) {
      throw new AppException({
        message: 'Module not found.',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const deletedSigns = (module.signs ?? []).filter(
      (currentSign) => !(data.signs ?? []).includes(currentSign.id),
    );

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
    await this.modulesRepository.update({
      data: {
        name: data.name,
        isPublished: data.isPublished,
        updatedAt: new Date(),
        signs: {
          deleteMany: deletedSigns,
          createMany: signs,
        },
      },
      where: {
        id: where.id,
      },
    });

    return module;
  }
}
