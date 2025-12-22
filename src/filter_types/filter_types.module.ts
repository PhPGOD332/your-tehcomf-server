import { Module } from '@nestjs/common';
import { FilterTypesController } from './filter_types.controller';
import { FilterTypesService } from './filter_types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterType } from './entites/FilterType';

@Module({
  imports: [TypeOrmModule.forFeature([FilterType])],
  controllers: [FilterTypesController],
  providers: [FilterTypesService],
})
export class FilterTypesModule {}
