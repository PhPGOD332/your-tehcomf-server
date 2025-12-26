import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDto } from './dto/PortfolioDto';
import { TFilterType } from '@/shared/entities';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({
    summary: 'Получить список работ',
    description:
      'Возвращает все работы. Можно передать несколько фильтров (парами filter-name / filter-value).',
  })
  @ApiQuery({
    name: 'filter-name',
    required: false,
    isArray: true,
    enum: ['style', 'type', 'color', 'layout', 'budget'],
    description: 'Имя фильтра: стиль, тип, цвет, планировка или бюджет.',
  })
  @ApiQuery({
    name: 'filter-value',
    required: false,
    isArray: true,
    description:
      'Значение фильтра (название или бюджет). При budget можно передать id или название.',
  })
  @ApiResponse({
    status: 200,
    type: [PortfolioDto],
  })
  @Get('')
  async getAllPortfolio(
    @Query('filter-name') filterName?: TFilterType | TFilterType[],
    @Query('filter-value') filterValue?: string | string[],
  ): Promise<PortfolioDto[]> {
    const filters = this.normalizeFilters(filterName, filterValue);
    return await this.portfolioService.getAllPortfolios(filters);
  }

  @ApiOperation({
    summary: 'Получить конкретную работу',
  })
  @ApiBody({
    description: 'Имя работы (поле name в БД)',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'kitchen-01' },
      },
      required: ['name'],
    },
  })
  @ApiResponse({
    status: 200,
  })
  @Post('work')
  async getPortfolioItem(
    @Body() body: { name: string },
  ): Promise<PortfolioDto | null> {
    return await this.portfolioService.getPortfolioItem(body.name);
  }

  private normalizeFilters(
    filterName?: TFilterType | TFilterType[],
    filterValue?: string | string[],
  ): { name: TFilterType; value: string }[] {
    const names = Array.isArray(filterName)
      ? filterName
      : filterName
        ? [filterName]
        : [];
    const values = Array.isArray(filterValue)
      ? filterValue
      : filterValue
        ? [filterValue]
        : [];

    const pairs: { name: TFilterType; value: string }[] = [];
    const length = Math.min(names.length, values.length);

    for (let i = 0; i < length; i += 1) {
      if (names[i] && values[i]) {
        pairs.push({ name: names[i], value: values[i] });
      }
    }

    return pairs;
  }
}
