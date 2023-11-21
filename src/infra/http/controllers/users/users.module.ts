import { Module } from '@nestjs/common';

import { CreateUserUseCase } from '@app/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from '@app/use-cases/users/delete-user.use-case';
import { GetUserByIdUseCase } from '@app/use-cases/users/get-user-by-id.use-case';
import { ListAllUsersUseCase } from '@app/use-cases/users/list-all-users.use-case';
import { UpdateUserUseCase } from '@app/use-cases/users/update-user.use-case';
import { BcryptHashService } from '@infra/services/hash/bcrypt-hash.service';

import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IHashService',
      useClass: BcryptHashService,
    },
    GetUserByIdUseCase,
    ListAllUsersUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [],
})
export class UsersModule {}
