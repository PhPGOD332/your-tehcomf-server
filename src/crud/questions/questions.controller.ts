import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category, Question } from '@prisma/client';
import { CategoryEntity } from './entities';
import { QuestionEntity } from './entities/Question';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

@ApiTags('Questions')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Получить все категории вопросов' })
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  @Public()
  @Get('categories')
  async getAllCategories(): Promise<Category[]> {
    return this.questionsService.getAllCategories();
  }

  @ApiOperation({ summary: 'Получить все вопросы с категориями' })
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  @Public()
  @Get('categoriesWithQuestions')
  async getAllQuestionsByCategories(): Promise<Category[]> {
    return this.questionsService.getQuestionsByCategories();
  }

  @ApiOperation({ summary: 'Получить все вопросы (админка)' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, type: [QuestionEntity] })
  @AdminAccess()
  @Get('')
  async getAllQuestions(): Promise<(Question & { category: Category | null })[]> {
    return this.questionsService.getAllQuestions();
  }

  @ApiOperation({ summary: 'Создать категорию' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryEntity })
  @AdminAccess()
  @Post('categories')
  async createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.questionsService.createCategory(dto);
  }

  @ApiOperation({ summary: 'Обновить категорию' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, type: CategoryEntity })
  @AdminAccess()
  @Patch('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.questionsService.updateCategory(id, dto);
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete('categories/:id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.questionsService.deleteCategory(id);
    return { success: true };
  }

  @ApiOperation({ summary: 'Создать вопрос' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.CREATED, type: QuestionEntity })
  @AdminAccess()
  @Post('')
  async createQuestion(
    @Body() dto: CreateQuestionDto,
  ): Promise<Question & { category: Category | null }> {
    return this.questionsService.createQuestion(dto);
  }

  @ApiOperation({ summary: 'Обновить вопрос' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, type: QuestionEntity })
  @AdminAccess()
  @Patch(':id')
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuestionDto,
  ): Promise<Question & { category: Category | null }> {
    return this.questionsService.updateQuestion(id, dto);
  }

  @ApiOperation({ summary: 'Удалить вопрос' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteQuestion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.questionsService.deleteQuestion(id);
    return { success: true };
  }
}
