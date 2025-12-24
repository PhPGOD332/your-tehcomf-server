import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioDto } from './dto/PortfolioDto';
import {
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from './entities';
import { TFilterType } from '@/shared';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    @InjectRepository(PortfolioColorsList)
    private readonly portfolioColorsListRepository: Repository<PortfolioColorsList>,
    @InjectRepository(PortfolioImagesList)
    private readonly portfolioImagesListRepository: Repository<PortfolioImagesList>,
  ) {}

  async getAllPortfolios(
    filterProperty?: TFilterType,
    filterValue?: string,
  ): Promise<PortfolioDto[]> {
    // Если есть фильтрация
    if (filterProperty) {
      const portfolios = await this.portfolioRepository.find({
        where: {
          [filterProperty]: {
            name: filterValue,
          },
        },
        relations: ['type', 'layout', 'bodyColor', 'tableTopColor', 'style'],
      });

      const portfoliosDTO: PortfolioDto[] = [];

      for (const portfolio of portfolios) {
        const facadeColors = await this.portfolioColorsListRepository.find({
          relations: ['work', 'color'],
          where: { work: portfolio },
        });

        const imagesList = await this.portfolioImagesListRepository.find({
          relations: ['work', 'image'],
          where: { work: portfolio },
        });

        portfoliosDTO.push(
          new PortfolioDto(portfolio, facadeColors, imagesList),
        );
      }

      return portfoliosDTO;
    }

    // Если нет фильтрации
    const portfolios = await this.portfolioRepository.find({
      // where:
      relations: ['type', 'layout', 'bodyColor', 'tableTopColor'],
    });

    const portfoliosDTO: PortfolioDto[] = [];

    for (const portfolio of portfolios) {
      const facadeColors = await this.portfolioColorsListRepository.find({
        relations: ['work', 'color'],
        where: { work: portfolio },
      });

      const imagesList = await this.portfolioImagesListRepository.find({
        relations: ['work', 'image'],
        where: { work: portfolio },
      });

      portfoliosDTO.push(new PortfolioDto(portfolio, facadeColors, imagesList));
    }

    return portfoliosDTO;
  }

  async getPortfolioItem(name: string): Promise<PortfolioDto | null> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { name: name },
      relations: ['type', 'layout', 'bodyColor', 'tableTopColor'],
    });

    if (!portfolio) return null;

    const facadeColors = await this.portfolioColorsListRepository.find({
      relations: ['work', 'color'],
      where: { work: portfolio },
    });

    const imagesList = await this.portfolioImagesListRepository.find({
      relations: ['work', 'image'],
      where: { work: portfolio },
    });

    return new PortfolioDto(portfolio, facadeColors, imagesList);
  }
}
