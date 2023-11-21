import { IUser } from '@app/entities/user.entity';

export class UserViewModel {
  static toHTTP(data: IUser) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt ?? undefined,
    };
  }

  static toAdminHTTP(data: IUser) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      roles: data.roles,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt ?? undefined,
    };
  }
}
