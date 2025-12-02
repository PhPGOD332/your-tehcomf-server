import {Controller, Get} from '@nestjs/common';
import {FilterColorsService} from "./filter_colors.service";
import {FilterColor} from "./entities/FilterColor";

@Controller('filter-colors')
export class FilterColorsController {
    constructor(private readonly filterColorsService: FilterColorsService) {}

    @Get('')
    async getFilterColors(): Promise<FilterColor[]> {
        return await this.filterColorsService.getFilterColors();
    }
}
