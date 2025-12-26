import { Module } from '@nestjs/common';
import { FilterColorsController } from './filter_colors.controller';
import { FilterColorsService } from './filter_colors.service';

@Module({
  controllers: [FilterColorsController],
  providers: [FilterColorsService],
})
export class FilterColorsModule {}
