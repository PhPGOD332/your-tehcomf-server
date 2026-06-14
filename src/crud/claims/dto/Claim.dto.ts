import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class ClaimDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  mobilePhone: string;
  @ApiProperty()
  @IsString()
  note: string;
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;
  @ApiProperty({ example: 'Обсудить проект' })
  @IsString()
  @IsNotEmpty()
  claimType: string;
  @ApiProperty({ required: false, example: 'ООО Ремонтное бюро' })
  @ValidateIf((claim: ClaimDto) => claim.claimType === 'Ремонтное бюро')
  @IsString()
  @IsNotEmpty()
  company?: string;
}
