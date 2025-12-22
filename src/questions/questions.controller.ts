import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Category } from './entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Получить все категории вопросов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Category] })
  @Get('categories')
  async getAllCategories(): Promise<Category[]> {
    return await this.questionsService.getAllCategories();
  }

  @ApiOperation({ summary: 'Получить все вопросы с категориями' })
  @ApiResponse({ status: HttpStatus.OK, type: [Category] })
  @Get('categoriesWithQuestions')
  async getAllQuestionsByCategories(): Promise<Category[]> {
    return await this.questionsService.getQuestionsByCategories();
  }
}
