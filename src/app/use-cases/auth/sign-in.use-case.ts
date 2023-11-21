import { Inject, Injectable } from '@nestjs/common';

import { AppException } from '@app/exceptions/app.exception';
import { IUsersRepository } from '@app/repositories/users.repository';
import { IHashService } from '@app/services/hash.service';
import { IJwtService } from '@app/services/jwt.service';
import { SignInRequest } from '@contracts/auth/sign-in.contract';

interface ISignInUseCase {
  execute(params: SignInRequest): Promise<string>;
}

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject('IHashService')
    private readonly hashService: IHashService,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  async execute({ email, password }: SignInRequest) {
    const user = await this.usersRepository.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppException({
        statusCode: 400,
        message: 'Invalid credentials.',
      });
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new AppException({
        statusCode: 400,
        message: 'Invalid credentials.',
      });
    }

    const accessToken = await this.jwtService.sign({
      id: user.id,
      roles: user.roles,
    });

    return accessToken;
  }
}
