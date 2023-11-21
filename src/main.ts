import { NestFactory } from '@nestjs/core';

import { env } from '@infra/env';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.listen(env.port, '0.0.0.0');

  console.log(`Server is running on port ${env.port}`);
}
bootstrap();
