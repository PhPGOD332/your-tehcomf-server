import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, MailService],
})
export class MailModule {}
