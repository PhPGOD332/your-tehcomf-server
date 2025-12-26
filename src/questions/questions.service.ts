import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '@/database';

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
}
