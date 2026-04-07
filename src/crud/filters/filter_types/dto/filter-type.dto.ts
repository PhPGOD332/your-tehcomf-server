import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFilterTypeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  caption: string;

  @ApiPropertyOptional({
    description: 'Подпись карточки, например: "гостиная"',
    example: 'гостиная',
  })
  @IsOptional()
  @IsString()
  cardCaption?: string;

  @ApiProperty({ default: 'type' })
  @IsString()
  type: string;
}

export class UpdateFilterTypeDto extends PartialType(CreateFilterTypeDto) {}
