import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // Logger
  app.useLogger(new ConsoleLogger());
  const logger = new ConsoleLogger();
  logger.setContext('Main');

  // Config
  const config = app.get(ConfigService);
  const API_URL = config.getOrThrow<string>('API_URL');

  const swagger = new DocumentBuilder()
    .setTitle('TehComf API server')
    .setDescription(
      'API документация к сайту TehComf (<a href="https://tehcomf.ru" target="_blank">https://tehcomf.ru</a>)',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .setContact(
      'Kireev Kirill',
      'https://t.me/ker4ik13',
      'kireev.kirill2004@mail.ru',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3001);
  logger.log(`🚀 Backend server started: ${API_URL}`);
  logger.log(`📊 Swagger: ${API_URL}/docs`);
}
void bootstrap();
