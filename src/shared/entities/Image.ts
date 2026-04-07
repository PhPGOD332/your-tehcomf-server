import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: number;

  @ApiProperty({ name: 'image' })
  src: string;

  @ApiProperty({ required: false, nullable: true })
  s3Key?: string | null;

  @ApiProperty({ name: 'image_alt' })
  imageAlt: string;

  @ApiProperty({ required: false, nullable: true })
  width?: number | null;

  @ApiProperty({ required: false, nullable: true })
  height?: number | null;

  @ApiProperty({ required: false, nullable: true })
  order?: number | null;
}
