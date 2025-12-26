import { Controller, Get } from '@nestjs/common';
import { FilterColorsService } from './filter_colors.service';
import { FilterColor } from '@prisma/client';

@Controller('filter-colors')
export class FilterColorsController {
  constructor(private readonly filterColorsService: FilterColorsService) {}

  @Get('')
  async getFilterColors(): Promise<FilterColor[]> {
    return this.filterColorsService.getFilterColors();
  }
}
