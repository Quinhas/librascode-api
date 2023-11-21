import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { IUserRoles } from '@app/enums/user-roles.enum';
import { CreateSignUseCase } from '@app/use-cases/signs/create-sign.use-case';
import { ListSignsUseCase } from '@app/use-cases/signs/list-signs.use-case';
import {
  CreateSignRequest,
  createSignRequestSchema,
} from '@contracts/signs/create-sign.contract';
import { Roles } from '@infra/http/decorators/roles.decorator';
import { ZodValidationPipe } from '@infra/http/pipes/zod-validation.pipe';
import { SignViewModel } from '@infra/http/view-models/sign.view-model';

@Controller('signs')
export class SignsController {
  constructor(
    private readonly createSign: CreateSignUseCase,
    private readonly listSigns: ListSignsUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const signs = await this.listSigns.execute();

    return signs.map(SignViewModel.toHTTP);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles([IUserRoles.ADMIN, IUserRoles.MODERATOR])
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body(new ZodValidationPipe(createSignRequestSchema))
    body: CreateSignRequest,
    // eslint-disable-next-line no-undef
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);
    const { name, isPublished } = body;

    const sign = await this.createSign.execute({
      data: { name, isPublished: Boolean(isPublished), image },
    });

    return SignViewModel.toHTTP(sign);
  }
}
