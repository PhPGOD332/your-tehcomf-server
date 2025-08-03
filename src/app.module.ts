import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClaimsModule } from './claims/claims.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";

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
    DatabaseModule,
    ClaimsModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
