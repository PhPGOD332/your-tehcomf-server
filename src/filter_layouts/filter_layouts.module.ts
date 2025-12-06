import { Module } from '@nestjs/common';
import { FilterLayoutsController } from './filter_layouts.controller';
import { FilterLayoutsService } from './filter_layouts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FilterLayout} from "./entities/FilterLayout";

@Module({
  imports: [TypeOrmModule.forFeature([FilterLayout])],
  controllers: [FilterLayoutsController],
  providers: [FilterLayoutsService]
})
export class FilterLayoutsModule {}
