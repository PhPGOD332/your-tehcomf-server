import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: number;

  @ApiProperty({ name: 'image' })
  src: string;

  @ApiProperty({ name: 'image_alt' })
  imageAlt: string;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  order: number;
}
