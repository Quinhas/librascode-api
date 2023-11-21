import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production']);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: unknown) => {
    if (env === process.env.NODE_ENV && !value) {
      return false;
    }

    return true;
  };
}

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),
  port: z.number().default(3030),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  AWS_S3_BUCKET: z.string().min(1),
  AWS_S3_REGION: z.string().min(1),
  AWS_S3_ACCESS_KEY_ID: z.string().min(1),
  AWS_S3_SECRET_ACCESS_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
