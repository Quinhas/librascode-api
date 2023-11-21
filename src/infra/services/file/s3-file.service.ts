/* eslint-disable class-methods-use-this */
import { extname } from 'path';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

import { IFileService } from '@app/services/file.service';
import { env } from '@infra/env';

@Injectable()
export class S3FileService implements IFileService {
  // eslint-disable-next-line no-undef
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const endpoint = 'public/images';
    const s3 = new S3Client({
      region: env.AWS_S3_REGION,
      credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });

    const fileName = `${endpoint}/${Date.now()}-${
      file.originalname.split('.')[0]
    }${extname(file.originalname).toLowerCase()}`;

    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    return fileName;
  }
}
