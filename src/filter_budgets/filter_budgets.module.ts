import { Module } from '@nestjs/common';
import { FilterBudgetsController } from './filter_budgets.controller';
import { FilterBudgetsService } from './filter_budgets.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FilterBudget} from "./entities/FilterBudget";

@Module({
  imports: [TypeOrmModule.forFeature([FilterBudget])],
  controllers: [FilterBudgetsController],
  providers: [FilterBudgetsService]
})
export class FilterBudgetsModule {}
