import { z } from 'zod';

import { createModuleRequestSchema } from './create-module.contract';

export const UpdateModuleParamsSchema = z.object({
  id: z.string().min(1).uuid(),
});

export type UpdateModuleParams = z.infer<typeof UpdateModuleParamsSchema>;

export const UpdateModuleDtoSchema = createModuleRequestSchema.partial();

export type UpdateModuleDto = z.infer<typeof UpdateModuleDtoSchema>;
