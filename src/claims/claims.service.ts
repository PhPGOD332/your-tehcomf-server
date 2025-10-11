import { Injectable } from '@nestjs/common';
import {ClaimDto} from "./dto/Claim.dto";
import {MailService} from "../mail/mail.service";
import {ConfigService} from "@nestjs/config";
import {IClaim} from "./types/IClaim";

@Injectable()
export class ClaimsService {
    constructor(private readonly mailService: MailService, private readonly configService: ConfigService) {}

    async addClaim(claim: ClaimDto): Promise<IClaim> {
        return await this.mailService.sendMail(claim);
    }
}
