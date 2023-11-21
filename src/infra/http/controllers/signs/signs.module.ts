import { Module } from '@nestjs/common';

import { CreateSignUseCase } from '@app/use-cases/signs/create-sign.use-case';
import { ListSignsUseCase } from '@app/use-cases/signs/list-signs.use-case';
import { S3FileService } from '@infra/services/file/s3-file.service';

import { SignsController } from './signs.controller';

@Module({
  imports: [],
  controllers: [SignsController],
  providers: [
    ListSignsUseCase,
    CreateSignUseCase,
    { provide: 'FileService', useClass: S3FileService },
  ],
  exports: [],
})
export class SignsModule {}
