import {Controller, Get} from '@nestjs/common';
import {FilterTypesService} from "./filter_types.service";
import {FilterType} from "./entites/FilterType";

@Controller('filter-types')
export class FilterTypesController {
    constructor(private readonly filterTypesService: FilterTypesService) {}

    @Get('')
    async getFilterTypes(): Promise<FilterType[]> {
        return await this.filterTypesService.getFilterTypes();
    }
}
