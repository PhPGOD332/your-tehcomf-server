import { Module } from '@nestjs/common';
import { FilterColorsController } from './filter_colors.controller';
import { FilterColorsService } from './filter_colors.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FilterColor} from "./entities/FilterColor";

@Module({
  imports: [TypeOrmModule.forFeature([FilterColor])],
  controllers: [FilterColorsController],
  providers: [FilterColorsService]
})
export class FilterColorsModule {}
