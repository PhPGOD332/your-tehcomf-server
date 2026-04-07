import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PortfolioModule } from './crud/portfolio/portfolio.module';
import {
  FilterBudgetsModule,
  FilterColorsModule,
  FilterLayoutsModule,
  FilterStylesModule,
  FilterTypesModule,
} from './crud/filters';
import { DatabaseModule } from './crud/database';
import { ClaimsModule } from './crud/claims';
import { MailModule } from './crud/mail';
import { ColorsModule } from './crud/colors';
import { QuestionsModule } from './crud/questions';
import { AuthModule } from './auth';
import { UsersModule } from './crud/users';
import { MediaModule } from './crud/media';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../data/images'),
      serveRoot: '/images/',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
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
    UsersModule,
    AuthModule,
    MediaModule,
    ColorsModule,
    FilterColorsModule,
    FilterTypesModule,
    FilterStylesModule,
    FilterBudgetsModule,
    PortfolioModule,
    FilterLayoutsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
