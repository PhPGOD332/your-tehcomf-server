import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterBudget} from "./entities/FilterBudget";

@Injectable()
export class FilterBudgetsService {
    constructor(
        @InjectRepository(FilterBudget)
        private filterBudgetRepository: Repository<FilterBudget>
    ) {}

    async getFilterBudgets(): Promise<FilterBudget[]> {
        return await this.filterBudgetRepository.find();
    }
}
