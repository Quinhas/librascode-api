import { Injectable } from '@nestjs/common';

import { IModulesRepository } from '@app/repositories/modules.repository';
import { FavoriteModuleRequest } from '@contracts/modules/favorite-module.contract';

interface IFavoriteModuleUseCase {
  execute(params: FavoriteModuleRequest): Promise<void>;
}

@Injectable()
export class FavoriteModuleUseCase implements IFavoriteModuleUseCase {
  constructor(private readonly modulesRepository: IModulesRepository) {}

  async execute({
    userId,
    moduleId,
  }: {
    userId?: string;
    moduleId?: string;
  }): Promise<void> {
    throw new Error('Method not implemented');
  }
}
