import { Module } from '@nestjs/common';
import { FilterTypesController } from './filter_types.controller';
import { FilterTypesService } from './filter_types.service';

@Module({
  controllers: [FilterTypesController],
  providers: [FilterTypesService],
})
export class FilterTypesModule {}
