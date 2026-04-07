import { ApiProperty } from '@nestjs/swagger';

export class FilterBudget {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  minValue: number;

  @ApiProperty()
  maxValue: number;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  type: 'budget';

  @ApiProperty()
  order: number;
}
