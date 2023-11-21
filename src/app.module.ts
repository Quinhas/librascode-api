import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { MulterConfigModule } from '@infra/modules/multer.module';

@Module({
  imports: [MulterConfigModule, HttpModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
