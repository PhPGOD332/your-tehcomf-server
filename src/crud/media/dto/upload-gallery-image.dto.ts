import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UploadGalleryImageDto {
  @ApiPropertyOptional({ example: 'Кухня в скандинавском стиле' })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @ApiPropertyOptional({ example: 'tehcomf/media/kitchens' })
  @IsOptional()
  @IsString()
  folder?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ example: 1920 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  width?: number;

  @ApiPropertyOptional({ example: 1080 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  height?: number;
}
