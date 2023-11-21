import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved

import { IUserRoles } from '@app/enums/user-roles.enum';
import { CreateModuleUseCase } from '@app/use-cases/modules/create-module.use-case';
import { GetModuleByIdUseCase } from '@app/use-cases/modules/get-module-by-id.use-case';
import { ListModulesUseCase } from '@app/use-cases/modules/list-modules.use-case';
import {
  CreateModuleRequest,
  createModuleRequestSchema,
} from '@contracts/modules/create-module.contract';
import {
  GetModuleByIdParams,
  GetModuleByIdParamsSchema,
} from '@contracts/modules/get-module-by-id.contract';
import { Roles } from '@infra/http/decorators/roles.decorator';
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation.pipe';
import { ModuleViewModel } from '@infra/http/view-models/module.view-model';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly getModuleById: GetModuleByIdUseCase,
    private readonly createModule: CreateModuleUseCase,
    private readonly listModules: ListModulesUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const modules = await this.listModules.execute();

    return modules.map(ModuleViewModel.toHTTP);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param(new ZodValidationPipe(GetModuleByIdParamsSchema))
    params: GetModuleByIdParams,
  ) {
    const { id } = params;

    const module = await this.getModuleById.execute({ id });

    return ModuleViewModel.toHTTP(module);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body(new ZodValidationPipe(createModuleRequestSchema))
    body: CreateModuleRequest,
    // eslint-disable-next-line no-undef
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    console.log(thumbnail);
    const { name, isPublished, signs } = body;

    const module = await this.createModule.execute({
      data: {
        name,
        isPublished: Boolean(isPublished),
        signs,
        thumbnail,
      },
    });

    return ModuleViewModel.toHTTP(module);
  }
}
