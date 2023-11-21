import { IModule } from '@app/entities/module.entity';

export class ModuleViewModel {
  static toHTTP(data: IModule) {
    return {
      id: data.id,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: data.isPublished,
      signs: data.signs,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt ?? undefined,
      deletedAt: data.deletedAt ?? undefined,
    };
  }
}
