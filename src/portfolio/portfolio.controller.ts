import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PortfolioService} from "./portfolio.service";
import {PortfolioDto} from "./dto/PortfolioDto";
import {Portfolio} from "./entities/Portfolio";

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get('')
    async getAllPortfolio(): Promise<PortfolioDto[]> {
        return await this.portfolioService.getAllPortfolios();
    }

    @Post('work')
    async getPortfolioItem(@Body() body: { name: string }): Promise<PortfolioDto | null> {
        return await this.portfolioService.getPortfolioItem(body.name);
    }
}
