import { Injectable } from '@nestjs/common';
import { FilterBudget } from '@prisma/client';
import { PrismaService } from '@/database';

@Injectable()
export class FilterBudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilterBudgets(): Promise<FilterBudget[]> {
    return this.prisma.filterBudget.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }
}
