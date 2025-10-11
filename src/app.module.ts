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

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      entities: [Category, Question]
    }),
    DatabaseModule,
    ClaimsModule,
    MailModule,
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
