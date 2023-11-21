import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';

interface IGetUserByIdUseCase {
  execute({ id }: { id: string }): Promise<IUser>;
}

@Injectable()
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<IUser> {
    const user = await this.usersRepository.findFirst({ where: { id } });

    if (!user) {
      throw new AppException({
        message: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }
}
