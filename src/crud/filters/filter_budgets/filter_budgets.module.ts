import { Module } from '@nestjs/common';
import { FilterBudgetsController } from './filter_budgets.controller';
import { FilterBudgetsService } from './filter_budgets.service';

@Module({
  controllers: [FilterBudgetsController],
  providers: [FilterBudgetsService],
})
export class FilterBudgetsModule {}
