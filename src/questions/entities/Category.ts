import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from './Question';

export class CategoryEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  category: string;

  @ApiProperty({ type: () => [QuestionEntity], required: false })
  questions?: QuestionEntity[];
}
