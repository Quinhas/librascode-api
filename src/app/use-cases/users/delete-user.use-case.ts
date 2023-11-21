import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';
import { DeleteUserParams } from '@contracts/users/delete-user.contract';

interface IDeleteUserUseCase {
  execute(params: { where: DeleteUserParams }): Promise<IUser>;
}

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ where }: { where: DeleteUserParams }): Promise<IUser> {
    const { id } = where;

    const user = await this.usersRepository.findFirst({ where: { id } });

    if (!user) {
      throw new AppException({
        message: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    user.isDisabled = true;
    user.deletedAt = new Date();
    user.updatedAt = new Date();

    await this.usersRepository.update({ where: { id }, data: user });

    return user;
  }
}
