import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  caption: string;

  @ApiProperty({ example: '#FFFFFF' })
  @IsHexColor()
  hexCode: string;

  @ApiPropertyOptional({ example: '#000000' })
  @IsOptional()
  @IsHexColor()
  captionCode?: string;
}

export class UpdateColorDto extends PartialType(CreateColorDto) {}
