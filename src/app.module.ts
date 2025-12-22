import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { isNumber } from 'class-validator';
import { PortfolioModule } from './portfolio/portfolio.module';
import { Image } from '@/shared';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Color, ColorsModule } from './colors';
import { Category, Question, QuestionsModule } from './questions';
import {
  FilterBudget,
  FilterBudgetsModule,
  FilterColor,
  FilterColorsModule,
  FilterLayout,
  FilterLayoutsModule,
  FilterStylesModule,
  FilterType,
  FilterTypesModule,
} from './filters';
import {
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from './portfolio';
import { DatabaseModule } from './database';
import { ClaimsModule } from './claims';
import { MailModule } from './mail';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../data/images'),
      serveRoot: '/images/',
    }),
    MailerModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
          secure: true,
          requireTLS: true,
          logger: true,
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST ?? 'localhost',
      port: isNumber(process.env.PG_PORT) ? process.env.PG_PORT : 5432,
      database: process.env.PG_DB,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      entities: [
        Image,
        Color,
        Category,
        Question,
        FilterColor,
        FilterType,
        FilterLayout,
        FilterBudget,
        Portfolio,
        PortfolioColorsList,
        PortfolioImagesList,
      ],
      synchronize: true,
    }),
    DatabaseModule,
    ClaimsModule,
    MailModule,
    QuestionsModule,
    ColorsModule,
    FilterColorsModule,
    FilterTypesModule,
    FilterStylesModule,
    FilterBudgetsModule,
    PortfolioModule,
    FilterLayoutsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
