import { Module } from '@nestjs/common';

import { CreateModuleUseCase } from '@app/use-cases/modules/create-module.use-case';
import { GetModuleByIdUseCase } from '@app/use-cases/modules/get-module-by-id.use-case';
import { ListModulesUseCase } from '@app/use-cases/modules/list-modules.use-case';
import { S3FileService } from '@infra/services/file/s3-file.service';

import { ModulesController } from './modules.controller';

@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [
    GetModuleByIdUseCase,
    ListModulesUseCase,
    CreateModuleUseCase,
    { provide: 'FileService', useClass: S3FileService },
  ],
  exports: [],
})
export class ModulesModule {}
