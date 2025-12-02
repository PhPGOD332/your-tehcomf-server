import {Controller, Get} from '@nestjs/common';
import {PortfolioService} from "./portfolio.service";
import {PortfolioDto} from "./dto/PortfolioDto";

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get('')
    async getAllPortfolio(): Promise<PortfolioDto[]> {
        return await this.portfolioService.getAllPortfolios();
    }
}
