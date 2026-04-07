import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Question } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  getQuestionsByCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        questions: {
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  getAllQuestions(): Promise<(Question & { category: Category | null })[]> {
    return this.prisma.question.findMany({
      include: { category: true },
      orderBy: { id: 'asc' },
    });
  }

  createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: dto });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    await this.ensureCategoryExists(id);
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.ensureCategoryExists(id);
    await this.prisma.question.updateMany({
      where: { categoryId: id },
      data: { categoryId: null },
    });
    await this.prisma.category.delete({ where: { id } });
  }

  createQuestion(
    dto: CreateQuestionDto,
  ): Promise<Question & { category: Category | null }> {
    return this.prisma.question.create({
      data: {
        question: dto.question,
        questionDescription: dto.questionDescription,
        categoryId: dto.categoryId,
      },
      include: { category: true },
    });
  }

  async updateQuestion(
    id: number,
    dto: UpdateQuestionDto,
  ): Promise<Question & { category: Category | null }> {
    await this.ensureQuestionExists(id);

    return this.prisma.question.update({
      where: { id },
      data: {
        question: dto.question,
        questionDescription: dto.questionDescription,
        categoryId: dto.categoryId,
      },
      include: { category: true },
    });
  }

  async deleteQuestion(id: number): Promise<void> {
    await this.ensureQuestionExists(id);
    await this.prisma.question.delete({ where: { id } });
  }

  private async ensureCategoryExists(id: number): Promise<void> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Категория с id=${id} не найдена`);
    }
  }

  private async ensureQuestionExists(id: number): Promise<void> {
    const question = await this.prisma.question.findUnique({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Вопрос с id=${id} не найден`);
    }
  }
}
