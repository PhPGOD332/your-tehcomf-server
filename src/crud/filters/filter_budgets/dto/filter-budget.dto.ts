import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateFilterBudgetDto {
  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minValue?: number;

  @ApiPropertyOptional({ example: 300000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxValue?: number;

  @ApiProperty()
  @IsString()
  caption: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'budget' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order: number;
}

export class UpdateFilterBudgetDto extends PartialType(CreateFilterBudgetDto) {}
