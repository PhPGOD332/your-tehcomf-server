import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDto } from './dto/PortfolioDto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('')
  async getAllPortfolio(): Promise<PortfolioDto[]> {
    return await this.portfolioService.getAllPortfolios();
  }

  @Post('work')
  async getPortfolioItem(
    @Body() body: { name: string },
  ): Promise<PortfolioDto | null> {
    return await this.portfolioService.getPortfolioItem(body.name);
  }
}
