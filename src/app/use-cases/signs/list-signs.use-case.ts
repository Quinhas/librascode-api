import { Inject, Injectable } from '@nestjs/common';

import { ISign } from '@app/entities/sign.entity';
import { ISignsRepository } from '@app/repositories/signs.repository';

interface IListSignUseCase {
  execute(): Promise<ISign[]>;
}

@Injectable()
export class ListSignsUseCase implements IListSignUseCase {
  constructor(
    @Inject('ISignsRepository')
    private readonly signsRepository: ISignsRepository,
  ) {}

  async execute() {
    const signs = await this.signsRepository.findMany();

    return signs;
  }
}
