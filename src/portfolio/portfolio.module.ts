import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Portfolio} from "./entities/Portfolio";
import { PortfolioService } from './portfolio.service';
import {PortfolioColorsList} from "./entities/PortfolioColorsList";
import {PortfolioImagesList} from "./entities/PortfolioImagesList";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioColorsList, PortfolioImagesList])],
  controllers: [PortfolioController],
  providers: [PortfolioService]
})
export class PortfolioModule {}
