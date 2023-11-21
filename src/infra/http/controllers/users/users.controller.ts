import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { IUserRoles } from '@app/enums/user-roles.enum';
import { CreateUserUseCase } from '@app/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from '@app/use-cases/users/delete-user.use-case';
import { GetUserByIdUseCase } from '@app/use-cases/users/get-user-by-id.use-case';
import { ListAllUsersUseCase } from '@app/use-cases/users/list-all-users.use-case';
import { UpdateUserUseCase } from '@app/use-cases/users/update-user.use-case';
import {
  CreateUserDto,
  CreateUserDtoSchema,
} from '@contracts/users/create-user.contract';
import {
  DeleteUserParams,
  DeleteUserParamsSchema,
} from '@contracts/users/delete-user.contract';
import {
  GetUserByIdParams,
  GetUserByIdParamsSchema,
} from '@contracts/users/get-user-by-id.contract';
import {
  UpdateUserDto,
  UpdateUserDtoSchema,
  UpdateUserParams,
  UpdateUserParamsSchema,
} from '@contracts/users/update-user.contract';
import { ActiveUserId } from '@infra/http/decorators/active-user-id.decorator';
import { ActiveUserRoles } from '@infra/http/decorators/active-user-roles.decorator';
import { Roles } from '@infra/http/decorators/roles.decorator';
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation.pipe';
import { UserViewModel } from '@infra/http/view-models/user.view-model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdUseCase,
    private readonly listAllUsers: ListAllUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(@ActiveUserId() id: string) {
    const user = await this.getUserById.execute({ id });

    return UserViewModel.toHTTP(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  async findById(
    @Param(new ZodValidationPipe(GetUserByIdParamsSchema))
    params: GetUserByIdParams,
  ) {
    const { id } = params;

    const user = await this.getUserById.execute({ id });

    return UserViewModel.toHTTP(user);
  }

  /**
   * @todo Implementar forma correta de recuperar os query params através da validação do zod
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  async findAll(
    @Query('includeDeleted') includeDeleted: string,
    @Query('includeDisabled') includeDisabled: string,
    @ActiveUserRoles() userRoles: IUserRoles[],
  ) {
    const users = await this.listAllUsers.execute({
      includeDeleted: includeDeleted === 'true',
      includeDisabled: includeDisabled === 'true',
    });

    return userRoles.includes(IUserRoles.ADMIN)
      ? users.map(UserViewModel.toAdminHTTP)
      : users.map(UserViewModel.toHTTP);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  async create(
    @Body(new ZodValidationPipe(CreateUserDtoSchema)) data: CreateUserDto,
  ) {
    const { name, email, password, isDisabled, roles } = data;

    const user = await this.createUser.execute({
      data: { name, email, password, isDisabled, roles },
    });

    return UserViewModel.toHTTP(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  async update(
    @Param(new ZodValidationPipe(UpdateUserParamsSchema))
    params: UpdateUserParams,
    @Body(new ZodValidationPipe(UpdateUserDtoSchema)) data: UpdateUserDto,
  ) {
    const { id } = params;
    const { name, email, password, isDisabled, roles } = data;

    await this.updateUser.execute({
      where: { id },
      data: { name, email, password, isDisabled, roles },
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles([IUserRoles.ADMIN])
  async delete(
    @Param(new ZodValidationPipe(DeleteUserParamsSchema))
    params: DeleteUserParams,
  ) {
    const { id } = params;

    await this.deleteUser.execute({
      where: { id },
    });
  }
}
