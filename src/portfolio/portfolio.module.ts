import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioService } from './portfolio.service';
import {
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Portfolio,
      PortfolioColorsList,
      PortfolioImagesList,
    ]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
