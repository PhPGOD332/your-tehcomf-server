import { Module } from '@nestjs/common';
import { FilterStylesController } from './filter_styles.controller';
import { FilterStylesService } from './filter_styles.service';

@Module({
  controllers: [FilterStylesController],
  providers: [FilterStylesService],
})
export class FilterStylesModule {}
