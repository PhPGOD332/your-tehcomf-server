import { Controller, Get } from '@nestjs/common';
import { FilterStylesService } from './filter_styles.service';
import { FilterStyle } from './entities/FilterStyle';

@Controller('filter-styles')
export class FilterStylesController {
  constructor(private readonly filterStylesService: FilterStylesService) {}

  @Get('')
  async getFilterStyles(): Promise<FilterStyle[]> {
    return await this.filterStylesService.getFilterStyles();
  }
}
