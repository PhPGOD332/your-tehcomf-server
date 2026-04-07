import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimDto } from './dto/Claim.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorators/public.decorator';

@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @ApiOperation({
    summary: 'Создать заявку',
    description: 'Создает новую заявку в системе и возвращает ее',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ClaimDto,
  })
  @ApiBody({
    type: ClaimDto,
  })
  @Public()
  @Post('addClaim')
  async addClaim(@Body() claimDto: ClaimDto): Promise<ClaimDto> {
    return await this.claimsService.addClaim({
      ...claimDto,
      date: new Date(claimDto.date),
    });
  }
}
