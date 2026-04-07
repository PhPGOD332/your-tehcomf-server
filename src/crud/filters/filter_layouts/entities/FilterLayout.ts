import { ApiProperty } from '@nestjs/swagger';

export class FilterLayout {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  type: 'layout';

  @ApiProperty()
  order: number;
}
