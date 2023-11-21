import { Prisma } from '@prisma/client';

import { ISign } from '@app/entities/sign.entity';
import { CreateSignRequest } from '@contracts/signs/create-sign.contract';

type Where = Prisma.SignWhereInput;

export interface ISignsRepositoryFindFirst {
  where: Where;
}

export interface ISignsRepositoryFindMany {
  where?: Where;
  includeDeleted?: boolean;
  includeDisabled?: boolean;
}

export interface ISignsRepositoryCreate {
  data: CreateSignRequest;
}

export interface ISignsRepositoryUpdate {
  where: {
    id: string;
  };
  data: ISign;
}

export interface ISignsRepository {
  findFirst(params: ISignsRepositoryFindFirst): Promise<ISign | null>;
  findMany(params?: ISignsRepositoryFindMany): Promise<ISign[]>;
  create(params: ISignsRepositoryCreate): Promise<void>;
}
