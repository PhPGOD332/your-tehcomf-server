import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

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
}
