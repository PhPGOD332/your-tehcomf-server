import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDto } from './dto/PortfolioDto';
import { TFilterType } from '@/shared/entities';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
} from './dto/create-portfolio.dto';

@ApiTags('Portfolio')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
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
  @Public()
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
  @ApiParam({
    name: 'name',
    description: 'Имя работы (поле name в БД)',
    example: 'kitchen-01',
  })
  @ApiResponse({
    status: 200,
  })
  @Public()
  @Get(':name')
  async getPortfolioItem(
    @Param('name') name: string,
  ): Promise<PortfolioDto | null> {
    return await this.portfolioService.getPortfolioItem(name);
  }

  @ApiOperation({ summary: 'Получить портфолио по id (админка)' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: PortfolioDto })
  @AdminAccess()
  @Get('by-id/:id')
  async getPortfolioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PortfolioDto> {
    return this.portfolioService.getPortfolioById(id);
  }

  @ApiOperation({ summary: 'Создать запись портфолио' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: PortfolioDto })
  @AdminAccess()
  @Post('')
  async createPortfolio(@Body() dto: CreatePortfolioDto): Promise<PortfolioDto> {
    return this.portfolioService.createPortfolio(dto);
  }

  @ApiOperation({ summary: 'Обновить запись портфолио' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: PortfolioDto })
  @AdminAccess()
  @Patch(':id')
  async updatePortfolio(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfolioService.updatePortfolio(id, dto);
  }

  @ApiOperation({ summary: 'Удалить запись портфолио' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deletePortfolio(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.portfolioService.deletePortfolio(id);
    return { success: true };
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
