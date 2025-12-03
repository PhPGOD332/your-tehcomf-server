import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '../../data/images'));

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
