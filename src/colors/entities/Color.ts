import { ApiProperty } from '@nestjs/swagger';

export class ColorEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty({ name: 'hex_code' })
  hexCode: string;

  @ApiProperty({ name: 'caption_code' })
  captionCode: string;
}
