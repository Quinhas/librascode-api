import { Prisma } from '@prisma/client';

import { IModule } from '@app/entities/module.entity';

type Where = Prisma.ModuleWhereInput;

export interface IModulesRepositoryFindFirst {
  where: Where;
}

export interface IModulesRepositoryFindMany {
  where?: Prisma.ModuleWhereInput;
  includeDeleted?: boolean;
  includeDisabled?: boolean;
}

export interface IModulesRepositoryCreate {
  data: IModule;
}

export interface IModulesRepositoryUpdate {
  where: {
    id: string;
  };
  data: IModule;
}

export interface IModulesRepository {
  findFirst(params: IModulesRepositoryFindFirst): Promise<IModule | null>;
  findMany(params?: IModulesRepositoryFindMany): Promise<IModule[]>;
  create(params: IModulesRepositoryCreate): Promise<void>;
  update(params: IModulesRepositoryUpdate): Promise<void>;
}
