import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignInUseCase } from '@app/use-cases/auth/sign-in.use-case';
import { SignUpUseCase } from '@app/use-cases/auth/sign-up.use-case';
import {
  SignInRequest,
  signInRequestSchema,
} from '@contracts/auth/sign-in.contract';
import {
  SignUpRequest,
  signUpRequestSchema,
} from '@contracts/auth/sign-up.contract';
import { IsPublic } from '@infra/http/decorators/is-public.decorator';
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation.pipe';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body(new ZodValidationPipe(signInRequestSchema)) body: SignInRequest,
  ) {
    const { email, password } = body;

    const accessToken = await this.signInUseCase.execute({ email, password });

    return { accessToken };
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(new ZodValidationPipe(signUpRequestSchema)) body: SignUpRequest,
  ) {
    const { name, email, password } = body;

    const accessToken = await this.signUpUseCase.execute({
      name,
      email,
      password,
    });

    return { accessToken };
  }
}
