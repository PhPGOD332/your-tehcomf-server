import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GalleryImageEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Готовый абсолютный URL изображения' })
  src: string;

  @ApiPropertyOptional({ description: 'Ключ файла в S3-хранилище' })
  s3Key?: string | null;

  @ApiProperty()
  imageAlt: string;

  @ApiPropertyOptional()
  width?: number | null;

  @ApiPropertyOptional()
  height?: number | null;

  @ApiPropertyOptional()
  order?: number | null;
}
