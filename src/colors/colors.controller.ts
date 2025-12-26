import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Color } from '@prisma/client';
import { ColorEntity } from './entities/Color';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiOperation({ summary: 'Получить все цвета' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех цветов',
    type: [ColorEntity],
  })
  @Get('')
  async getColors(): Promise<Color[]> {
    return this.colorsService.getColors();
  }
}
