import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { MailService } from '@/crud/mail';

@Module({
  providers: [ClaimsService, MailService],
  controllers: [ClaimsController],
})
export class ClaimsModule {}
