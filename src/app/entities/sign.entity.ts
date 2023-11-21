export interface ISign {
  id: string;
  name: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
