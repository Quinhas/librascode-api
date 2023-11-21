import { randomUUID } from 'crypto';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUser } from '@app/entities/user.entity';
import { IUserRoles } from '@app/enums/user-roles.enum';
import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';
import { IHashService } from '@app/services/hash.service';
import { IJwtService } from '@app/services/jwt.service';
import { SignUpRequest } from '@contracts/auth/sign-up.contract';

interface ISignUpUseCase {
  execute(params: SignUpRequest): Promise<string>;
}

@Injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject('IHashService')
    private readonly hashService: IHashService,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  async execute(data: SignUpRequest) {
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
      isDisabled: false,
      roles: [IUserRoles.USER],
      favoriteModules: [],
      favoriteSigns: [],
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    await this.usersRepository.create({ data: user });

    const accessToken = await this.jwtService.sign({
      id: user.id,
      roles: user.roles,
    });

    return accessToken;
  }
}
