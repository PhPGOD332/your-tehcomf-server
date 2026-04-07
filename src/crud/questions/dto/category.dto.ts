import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  category: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
