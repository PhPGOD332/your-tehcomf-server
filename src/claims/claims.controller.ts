import {Body, Controller, Post} from '@nestjs/common';
import {ClaimDto} from "../dtos/Claim.dto";
import {ClaimsService} from "./claims.service";
import {IClaim} from "../types/IClaim";

@Controller('claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}

    @Post('addClaim')
    async addClaim(@Body() claimDto: ClaimDto): Promise<IClaim> {
        // console.log((new Date(claimDto.date).getDay() + 1).toString().padStart(2, '0'))
        return await this.claimsService.addClaim(
            {
                ...claimDto,
                date: new Date(claimDto.date)
            }
        );
        // return {
        //     id: 'string',
        //     firstName: 'string',
        //     phoneNumber: 'string',
        //     note: 'string',
        //     date: new Date()
        // };
    }
}
