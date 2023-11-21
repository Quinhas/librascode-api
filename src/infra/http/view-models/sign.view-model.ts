import { ISign } from '@app/entities/sign.entity';

export class SignViewModel {
  static toHTTP(data: ISign) {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      isPublished: data.isPublished,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt ?? undefined,
      deletedAt: data.deletedAt ?? undefined,
    };
  }
}
