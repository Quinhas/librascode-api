import { Prisma } from '@prisma/client';

import { IUser } from '@app/entities/user.entity';

type Where = Prisma.UserWhereInput;

export interface IUsersRepositoryFindFirst {
  where: Where;
}

export interface IUsersRepositoryFindMany {
  where?: Prisma.UserWhereInput;
  includeDeleted?: boolean;
  includeDisabled?: boolean;
}

export interface IUsersRepositoryCreate {
  data: IUser;
}

export interface IUsersRepositoryUpdate {
  where: {
    id: string;
  };
  data: IUser;
}

export interface IUsersRepository {
  findFirst(params: IUsersRepositoryFindFirst): Promise<IUser | null>;
  findMany(params?: IUsersRepositoryFindMany): Promise<IUser[]>;
  create(params: IUsersRepositoryCreate): Promise<void>;
  update(params: IUsersRepositoryUpdate): Promise<void>;
}
