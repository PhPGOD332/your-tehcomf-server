import {Controller, Get} from '@nestjs/common';
import {FilterBudget} from "./entities/FilterBudget";
import {FilterBudgetsService} from "./filter_budgets.service";

@Controller('filter-budgets')
export class FilterBudgetsController {
    constructor(private readonly filterBudgetsService: FilterBudgetsService) {}

    @Get('')
    async getFilterBudgets(): Promise<FilterBudget[]> {
        return await this.filterBudgetsService.getFilterBudgets();
    }
}
