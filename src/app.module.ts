import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClaimsModule } from './claims/claims.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import { QuestionsModule } from './questions/questions.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {isNumber} from "class-validator";
import {Category} from "./questions/entities/Category";
import {Question} from "./questions/entities/Question";
import { ColorsModule } from './colors/colors.module';
import {Color} from "./colors/entities/Color";
import { FilterColorsModule } from './filter_colors/filter_colors.module';
import {FilterColor} from "./filter_colors/entities/FilterColor";
import { FilterTypesModule } from './filter_types/filter_types.module';
import {FilterType} from "./filter_types/entites/FilterType";
import { FilterStylesModule } from './filter_styles/filter_styles.module';
import { FilterBudgetsModule } from './filter_budgets/filter_budgets.module';
import {FilterBudget} from "./filter_budgets/entities/FilterBudget";
import { PortfolioModule } from './portfolio/portfolio.module';
import {Portfolio} from "./portfolio/entities/Portfolio";
import {Image} from "./shared/entities/Image";
import {PortfolioColorsList} from "./portfolio/entities/PortfolioColorsList";
import {PortfolioImagesList} from "./portfolio/entities/PortfolioImagesList";
import {join} from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilterLayoutsModule } from './filter_layouts/filter_layouts.module';
import {FilterLayout} from "./filter_layouts/entities/FilterLayout";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../data/images'),
      serveRoot: '/images/'
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true
      })],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS')
          },
          secure: true,
          requireTLS: true,
          logger: true
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST ?? 'localhost',
      port: isNumber(process.env.PG_PORT) ? process.env.PG_PORT : 5432,
      database: process.env.PG_DB,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      entities: [Image, Color, Category, Question, FilterColor, FilterType, FilterLayout,
        FilterBudget, Portfolio, PortfolioColorsList, PortfolioImagesList]
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
    FilterLayoutsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
