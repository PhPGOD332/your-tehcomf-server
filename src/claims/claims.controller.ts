import {Body, Controller, Get, Post} from '@nestjs/common';
import {ClaimDto} from "../dtos/Claim.dto";
import {ClaimsService} from "./claims.service";
import {IClaim} from "../types/IClaim";

@Controller('claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}

    @Get('getClaims')
    getClaims(): IClaim {
        return {
            id: '1',
            firstName: 'name',
            phoneNumber: 'phone',
            note: 'note',
            dateCreated: 'date'
        } as IClaim;
    }

    @Post('addClaim')
    async addClaim(@Body() claimDto: ClaimDto): Promise<IClaim> {
        return await this.claimsService.addClaim(claimDto);
    }
}
