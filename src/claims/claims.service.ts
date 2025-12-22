import { Injectable } from '@nestjs/common';
import type { ClaimDto } from './dto/Claim.dto';
import { MailService } from '@/mail';

@Injectable()
export class ClaimsService {
  constructor(private readonly mailService: MailService) {}

  async addClaim(claim: ClaimDto): Promise<ClaimDto> {
    return await this.mailService.sendMail(claim);
  }
}
