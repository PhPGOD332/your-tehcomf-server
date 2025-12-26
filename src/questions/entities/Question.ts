import { ApiProperty } from '@nestjs/swagger';

export class QuestionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  question: string;

  @ApiProperty({ name: 'question_description' })
  questionDescription: string;

  @ApiProperty({ type: Number, required: false })
  categoryId?: number;
}
