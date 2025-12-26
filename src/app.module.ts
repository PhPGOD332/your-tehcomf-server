import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PortfolioModule } from './portfolio/portfolio.module';
import {
  FilterBudgetsModule,
  FilterColorsModule,
  FilterLayoutsModule,
  FilterStylesModule,
  FilterTypesModule,
} from './filters';
import { DatabaseModule } from './database';
import { ClaimsModule } from './claims';
import { MailModule } from './mail';
import { ColorsModule } from './colors';
import { QuestionsModule } from './questions';

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
