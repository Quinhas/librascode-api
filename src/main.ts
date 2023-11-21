import { NestFactory } from '@nestjs/core';

import { env } from '@infra/env';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ['*'] },
  });

  await app.listen(env.PORT);

  console.log(`Server is running on port ${env.PORT}`);
}
bootstrap();
