import { Module } from '@nestjs/common';
import { FilterLayoutsController } from './filter_layouts.controller';
import { FilterLayoutsService } from './filter_layouts.service';

@Module({
  controllers: [FilterLayoutsController],
  providers: [FilterLayoutsService],
})
export class FilterLayoutsModule {}
