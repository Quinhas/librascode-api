import { randomUUID } from 'crypto';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { IUserRoles } from '@app/enums/user-roles.enum';
import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';
import { IHashService } from '@app/services/hash.service';
import { CreateUserDto } from '@contracts/users/create-user.contract';

interface ICreateUserUseCase {
  execute(params: { data: CreateUserDto }): Promise<IUser>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject('IHashService')
    private readonly hashService: IHashService,
  ) {}

  async execute({ data }: { data: CreateUserDto }): Promise<IUser> {
    const emailAlreadyInUse = await this.usersRepository.findFirst({
      where: { email: data.email },
    });

    if (emailAlreadyInUse) {
      throw new AppException({
        message: 'Email already in use',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const hashedPassword = await this.hashService.hash(data.password);

    const user: IUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      isDisabled: data.isDisabled,
      roles: data.roles.map((role) => IUserRoles[role]),
      favoriteModules: [],
      favoriteSigns: [],
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    await this.usersRepository.create({ data: user });

    return user;
  }
}
