import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  getQuestionsByCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: {
        questions: true,
      },
    });
  }
}
