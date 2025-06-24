import {Body, Controller, Post} from '@nestjs/common';
import {ClaimDto} from "../dtos/Claim.dto";
import {ClaimsService} from "./claims.service";
import {IClaim} from "../types/IClaim";

@Controller('claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}

    @Post('addClaim')
    async addClaim(@Body() claimDto: ClaimDto): Promise<IClaim> {
        return await this.claimsService.addClaim(claimDto);
    }
}
