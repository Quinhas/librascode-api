import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  const PORT = process.env.PORT ?? 3030;
  await app.listen(PORT, '0.0.0.0');

  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
