import { randomUUID } from 'crypto';

import { Inject, Injectable } from '@nestjs/common';

import { ISign } from '@app/entities/sign.entity';
import { ISignsRepository } from '@app/repositories/signs.repository';
import { IFileService } from '@app/services/file.service';
import { CreateSignRequest } from '@contracts/signs/create-sign.contract';

interface ICreateSignUseCase {
  execute(params: { data: CreateSignRequest }): Promise<ISign>;
}

@Injectable()
export class CreateSignUseCase implements ICreateSignUseCase {
  constructor(
    @Inject('ISignsRepository')
    private readonly signsRepository: ISignsRepository,
    @Inject('FileService')
    private readonly fileService: IFileService,
  ) {}

  async execute({ data }: { data: CreateSignRequest }): Promise<ISign> {
    const imageUrl = await this.fileService.uploadFile(data.image);

    const sign: ISign = {
      id: randomUUID(),
      name: data.name,
      imageUrl,
      isPublished: data.isPublished,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    await this.signsRepository.create({ data: sign });

    return sign;
  }
}
