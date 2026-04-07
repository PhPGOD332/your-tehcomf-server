import { ApiProperty } from '@nestjs/swagger';

export class FilterStyle {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  type: 'style';

  @ApiProperty()
  order: number;
}
