import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateGalleryImageDto {
  @ApiPropertyOptional({ example: 'Кухня после редактирования описания' })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ example: 1600 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  width?: number;

  @ApiPropertyOptional({ example: 900 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  height?: number;
}
