import { IModule } from '@app/entities/module.entity';

export interface IUserFavoriteModulesRepository {
  findMany(): Promise<IModule[]>;
  create(params: { data: IModule }): Promise<void>;
}
