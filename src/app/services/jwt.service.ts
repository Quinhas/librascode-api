import { IUserRoles } from '@app/enums/user-roles.enum';

export interface IJwtPayload {
  id: string;
  roles: IUserRoles[];
}

export interface IJwtService {
  sign(params: IJwtPayload): Promise<string>;
  verify(token: string): Promise<IJwtPayload>;
}
