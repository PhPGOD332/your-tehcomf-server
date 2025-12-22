import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('TehComf API server')
    .setDescription(
      'API документация к сайту TehComf (<a href="https://tehcomf.ru" target="_blank">https://tehcomf.ru</a>)',
    )
    .setVersion('1.0')
    .setContact(
      'Kireev Kirill',
      'https://t.me/ker4ik13',
      'kireev.kirill2004@mail.ru',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application is running on: ${process.env.PORT} port`);
}
bootstrap();
