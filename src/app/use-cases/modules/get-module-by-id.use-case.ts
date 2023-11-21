import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IModule } from '@app/entities/module.entity';
import { AppException } from '@app/exceptions/app.exception';
import { IModulesRepository } from '@app/repositories/modules.repository';

interface IGetModuleByIdUseCase {
  execute({ id }: { id: string }): Promise<IModule>;
}

@Injectable()
export class GetModuleByIdUseCase implements IGetModuleByIdUseCase {
  constructor(
    @Inject('IModulesRepository')
    private readonly modulesRepository: IModulesRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<IModule> {
    const module = await this.modulesRepository.findFirst({ where: { id } });

    if (!module) {
      throw new AppException({
        message: 'Module not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return module;
  }
}
