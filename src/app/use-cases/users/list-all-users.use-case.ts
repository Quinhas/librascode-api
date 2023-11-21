import { Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { IUsersRepository } from '@app/repositories/users.repository';
import { ListAllUsersParams } from '@contracts/users/list-all-users.contract';

interface IListAllUsersUseCase {
  execute(params: ListAllUsersParams): Promise<IUser[]>;
}

@Injectable()
export class ListAllUsersUseCase implements IListAllUsersUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    includeDeleted = false,
    includeDisabled = false,
  }: ListAllUsersParams): Promise<IUser[]> {
    const users = await this.usersRepository.findMany({
      includeDeleted,
      includeDisabled,
    });

    return users;
  }
}
