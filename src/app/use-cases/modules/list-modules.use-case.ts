import { Inject, Injectable } from '@nestjs/common';

import { IModule } from '@app/entities/module.entity';
import { IModulesRepository } from '@app/repositories/modules.repository';

interface IListModulesUseCase {
  execute(): Promise<IModule[]>;
}

@Injectable()
export class ListModulesUseCase implements IListModulesUseCase {
  constructor(
    @Inject('IModulesRepository')
    private readonly modulesRepository: IModulesRepository,
  ) {}

  async execute() {
    const modules = await this.modulesRepository.findMany();

    return modules;
  }
}
