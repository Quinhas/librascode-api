import { z } from 'zod';

export const favoriteModuleRequestSchema = z.object({
  userId: z.string().min(1).uuid(),
  moduleId: z.string().min(1).uuid(),
});

export type FavoriteModuleRequest = z.infer<typeof favoriteModuleRequestSchema>;
