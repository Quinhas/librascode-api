import { IUserRoles } from '@app/enums/user-roles.enum';

import { IModule } from './module.entity';
import { ISign } from './sign.entity';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isDisabled: boolean;
  roles: IUserRoles[];

  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  favoriteModules: IModule[];
  favoriteSigns: ISign[];
}
