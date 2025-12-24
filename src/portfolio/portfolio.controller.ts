import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDto } from './dto/PortfolioDto';
import { TFilterType } from '@/shared/entities';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('')
  async getAllPortfolio(
    @Query('filter-name') filterName: TFilterType,
    @Query('filter-value') filterValue: string,
  ): Promise<PortfolioDto[]> {
    return await this.portfolioService.getAllPortfolios(
      filterName,
      filterValue,
    );
  }

  @Post('work')
  async getPortfolioItem(
    @Body() body: { name: string },
  ): Promise<PortfolioDto | null> {
    return await this.portfolioService.getPortfolioItem(body.name);
  }
}
