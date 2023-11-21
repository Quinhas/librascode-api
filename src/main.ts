import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ['http://localhost:5173', 'http://localhost:5174'] },
  });

  await app.listen(3030);

  console.log(`Server is running on http://localhost:${3030}`);
}
bootstrap();
