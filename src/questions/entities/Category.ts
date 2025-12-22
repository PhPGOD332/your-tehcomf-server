import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';
import { ApiProperty } from '@nestjs/swagger';

@Entity('nsi_questions_categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];
}
