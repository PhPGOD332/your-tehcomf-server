import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryEntity } from './entities';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Получить все категории вопросов' })
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  @Get('categories')
  async getAllCategories(): Promise<Category[]> {
    return this.questionsService.getAllCategories();
  }

  @ApiOperation({ summary: 'Получить все вопросы с категориями' })
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  @Get('categoriesWithQuestions')
  async getAllQuestionsByCategories(): Promise<Category[]> {
    return this.questionsService.getQuestionsByCategories();
  }
}
