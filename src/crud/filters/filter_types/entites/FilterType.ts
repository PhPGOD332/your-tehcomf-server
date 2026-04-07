import { ApiProperty } from '@nestjs/swagger';

export class FilterType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty({ required: false, nullable: true })
  cardCaption?: string | null;

  @ApiProperty()
  type: 'type';

  @ApiProperty({ required: false })
  order?: number;
}
