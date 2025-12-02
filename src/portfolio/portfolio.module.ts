import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Portfolio} from "./entities/Portfolio";
import { PortfolioService } from './portfolio.service';
import {PortfolioColorsList} from "./entities/PortfolioColorsList";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioColorsList])],
  controllers: [PortfolioController],
  providers: [PortfolioService]
})
export class PortfolioModule {}
