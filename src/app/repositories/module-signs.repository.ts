import { Prisma } from '@prisma/client';

import { IModuleSigns } from '@app/entities/module-signs.entity';

type Where = Prisma.ModuleSignsWhereInput;

export interface IModuleSignsRepositoryFindFirst {
  where: Where;
}

export interface IModuleSignsRepositoryFindMany {
  where?: Where;
  includeDeleted?: boolean;
  includeDisabled?: boolean;
}

export interface IModuleSignsRepositoryCreate {
  data: IModuleSigns;
}

export interface IModuleSignsRepositoryUpdate {
  where: {
    id: string;
  };
  data: IModuleSigns;
}

export interface IModuleSignsRepositoryDelete {
  where: {
    id: string;
  };
}

export interface IModuleSignsRepositoryDeleteMany {
  where: {
    id: string[];
  };
}

export interface IModuleSignsRepository {
  findFirst(
    params: IModuleSignsRepositoryFindFirst,
  ): Promise<IModuleSigns | null>;
  findMany(params?: IModuleSignsRepositoryFindMany): Promise<IModuleSigns[]>;
  create(params: IModuleSignsRepositoryCreate): Promise<void>;
  update(params: IModuleSignsRepositoryUpdate): Promise<void>;
  delete(params: IModuleSignsRepositoryDelete): Promise<void>;
  deleteMany(params: IModuleSignsRepositoryDeleteMany): Promise<void>;
}
