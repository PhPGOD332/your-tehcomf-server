import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 250000 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  typeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  styleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  layoutId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  colorId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  bodyColorId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  tableTopColorId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sizesRoom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sizesFurniture?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  housingMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  facadeMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tableTopMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  furnitureAccessories?: string;

  @ApiPropertyOptional({ type: [Number], default: [] })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  facadeColorIds?: number[];

  @ApiPropertyOptional({ type: [Number], default: [] })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  imageIds?: number[];
}

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {}
