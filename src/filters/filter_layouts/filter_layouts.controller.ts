import { Controller, Get } from '@nestjs/common';
import { FilterLayoutsService } from './filter_layouts.service';
import { FilterLayout } from './entities/FilterLayout';

@Controller('filter-layouts')
export class FilterLayoutsController {
  constructor(private readonly filterStylesLayout: FilterLayoutsService) {}

  @Get('')
  async getFilterStyles(): Promise<FilterLayout[]> {
    return await this.filterStylesLayout.getFilterLayouts();
  }
}
