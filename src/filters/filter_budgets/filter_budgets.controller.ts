import { Controller, Get } from '@nestjs/common';
import { FilterBudget } from '@prisma/client';
import { FilterBudgetsService } from './filter_budgets.service';

@Controller('filter-budgets')
export class FilterBudgetsController {
  constructor(private readonly filterBudgetsService: FilterBudgetsService) {}

  @Get('')
  async getFilterBudgets(): Promise<FilterBudget[]> {
    return this.filterBudgetsService.getFilterBudgets();
  }
}
