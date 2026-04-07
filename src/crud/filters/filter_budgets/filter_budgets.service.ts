import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterBudget } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import {
  CreateFilterBudgetDto,
  UpdateFilterBudgetDto,
} from './dto/filter-budget.dto';

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

  async createFilterBudget(dto: CreateFilterBudgetDto): Promise<FilterBudget> {
    return this.prisma.filterBudget.create({ data: dto });
  }

  async updateFilterBudget(
    id: number,
    dto: UpdateFilterBudgetDto,
  ): Promise<FilterBudget> {
    await this.ensureFilterBudgetExists(id);
    return this.prisma.filterBudget.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFilterBudget(id: number): Promise<void> {
    await this.ensureFilterBudgetExists(id);
    await this.prisma.filterBudget.delete({ where: { id } });
  }

  private async ensureFilterBudgetExists(id: number): Promise<void> {
    const filterBudget = await this.prisma.filterBudget.findUnique({
      where: { id },
    });

    if (!filterBudget) {
      throw new NotFoundException(`Фильтр бюджета с id=${id} не найден`);
    }
  }
}
