import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { IUserRoles } from '@app/enums/user-roles.enum';
import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';
import {
  UpdateUserDto,
  UpdateUserParams,
} from '@contracts/users/update-user.contract';

interface IUpdateUserUseCase {
  execute(params: {
    where: UpdateUserParams;
    data: UpdateUserDto;
  }): Promise<IUser>;
}

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    where,
    data,
  }: {
    where: UpdateUserParams;
    data: UpdateUserDto;
  }): Promise<IUser> {
    const { id } = where;

    const user = await this.usersRepository.findFirst({
      where: { id },
    });

    if (!user) {
      throw new AppException({
        message: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const { name, email, password, isDisabled, roles } = data;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (isDisabled !== undefined) {
      user.isDisabled = isDisabled;
    }

    if (roles) {
      user.roles = roles.map((role) => IUserRoles[role]);
    }

    user.updatedAt = new Date();

    await this.usersRepository.update({ where: { id }, data: user });

    return user;
  }
}
