import { Controller, Get } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Color } from './entities/Color';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get('')
  async getColors(): Promise<Color[]> {
    return await this.colorsService.getColors();
  }
}
