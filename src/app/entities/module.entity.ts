import { ISign } from './sign.entity';

export interface IModule {
  id: string;
  name: string;
  thumbnailUrl: string;
  isPublished: boolean;
  signs?: ISign[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
