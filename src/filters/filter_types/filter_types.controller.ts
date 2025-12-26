import { Controller, Get } from '@nestjs/common';
import {
  FilterTypesService,
  FilterTypeWithOrder,
} from './filter_types.service';

@Controller('filter-types')
export class FilterTypesController {
  constructor(private readonly filterTypesService: FilterTypesService) {}

  @Get('')
  async getFilterTypes(): Promise<FilterTypeWithOrder[]> {
    return this.filterTypesService.getFilterTypes();
  }
}
