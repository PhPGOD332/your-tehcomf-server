import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterBudget } from '@prisma/client';
import { FilterBudgetsService } from './filter_budgets.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterBudget as FilterBudgetEntity } from './entities/FilterBudget';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreateFilterBudgetDto,
  UpdateFilterBudgetDto,
} from './dto/filter-budget.dto';

@ApiTags('Filter Budgets')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('filter-budgets')
export class FilterBudgetsController {
  constructor(private readonly filterBudgetsService: FilterBudgetsService) {}

  @ApiOperation({ summary: 'Получить все фильтры бюджетов' })
  @ApiResponse({ status: 200, type: [FilterBudgetEntity] })
  @Public()
  @Get('')
  async getFilterBudgets(): Promise<FilterBudget[]> {
    return this.filterBudgetsService.getFilterBudgets();
  }

  @ApiOperation({ summary: 'Создать фильтр бюджета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: FilterBudgetEntity })
  @AdminAccess()
  @Post('')
  async createFilterBudget(
    @Body() dto: CreateFilterBudgetDto,
  ): Promise<FilterBudget> {
    return this.filterBudgetsService.createFilterBudget(dto);
  }

  @ApiOperation({ summary: 'Обновить фильтр бюджета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: FilterBudgetEntity })
  @AdminAccess()
  @Patch(':id')
  async updateFilterBudget(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilterBudgetDto,
  ): Promise<FilterBudget> {
    return this.filterBudgetsService.updateFilterBudget(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильтр бюджета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteFilterBudget(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.filterBudgetsService.deleteFilterBudget(id);
    return { success: true };
  }
}
