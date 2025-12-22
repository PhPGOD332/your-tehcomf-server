import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Color } from './entities/Color';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiOperation({ summary: 'Получить все цвета' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех цветов',
    type: [Color],
  })
  @Get('')
  async getColors(): Promise<Color[]> {
    return await this.colorsService.getColors();
  }
}
