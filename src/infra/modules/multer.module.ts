import { randomUUID } from 'crypto';
import { extname } from 'path';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads', // Specify the upload directory
        filename: (req, file, callback) => {
          const uuid = randomUUID();
          const extension = extname(file.originalname);
          callback(null, `${uuid}${extension}`);
        },
      }),
    }),
  ],
})
export class MulterConfigModule {}
