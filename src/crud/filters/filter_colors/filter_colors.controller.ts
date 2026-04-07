import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterColorsService } from './filter_colors.service';
import { FilterColor } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterColor as FilterColorEntity } from './entities/FilterColor';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreateFilterColorDto,
  UpdateFilterColorDto,
} from './dto/filter-color.dto';

@ApiTags('Filter Colors')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('filter-colors')
export class FilterColorsController {
  constructor(private readonly filterColorsService: FilterColorsService) {}

  @ApiOperation({ summary: 'Получить все фильтры цветов' })
  @ApiResponse({ status: 200, type: [FilterColorEntity] })
  @Public()
  @Get('')
  async getFilterColors(): Promise<FilterColor[]> {
    return this.filterColorsService.getFilterColors();
  }

  @ApiOperation({ summary: 'Создать фильтр цвета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: FilterColorEntity })
  @AdminAccess()
  @Post('')
  async createFilterColor(
    @Body() dto: CreateFilterColorDto,
  ): Promise<FilterColor> {
    return this.filterColorsService.createFilterColor(dto);
  }

  @ApiOperation({ summary: 'Обновить фильтр цвета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: FilterColorEntity })
  @AdminAccess()
  @Patch(':id')
  async updateFilterColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilterColorDto,
  ): Promise<FilterColor> {
    return this.filterColorsService.updateFilterColor(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильтр цвета' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteFilterColor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.filterColorsService.deleteFilterColor(id);
    return { success: true };
  }
}
