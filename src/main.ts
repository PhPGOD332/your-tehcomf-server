import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
