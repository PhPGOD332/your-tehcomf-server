import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Portfolio} from "./entities/Portfolio";
import {Repository} from "typeorm";
import {PortfolioDto} from "./dto/PortfolioDto";
import {PortfolioColorsList} from "./entities/PortfolioColorsList";

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio)
        private readonly portfolioRepository: Repository<Portfolio>,
        @InjectRepository(PortfolioColorsList)
        private readonly portfolioColorsListRepository: Repository<PortfolioColorsList>
    ) {}

    async getAllPortfolios(): Promise<PortfolioDto[]> {
        const portfolios = await this.portfolioRepository.find({
            relations: ['mainImage', 'type', 'layout', 'bodyColor', 'tableTopColor']
        });

        const portfoliosDTO: PortfolioDto[] = [];

        for (const portfolio of portfolios) {
            const facadeColors = await this.portfolioColorsListRepository.find({
                relations: ['work', 'color'],
                where: { work: portfolio }
            });

            portfoliosDTO.push(new PortfolioDto(portfolio, facadeColors));
        }

        // console.log(portfoliosDTO);

        return portfoliosDTO;
    }
}
