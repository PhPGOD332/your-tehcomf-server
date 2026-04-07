import { ApiProperty } from '@nestjs/swagger';

export class FilterColor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  type: 'color';

  @ApiProperty()
  order: number;
}
