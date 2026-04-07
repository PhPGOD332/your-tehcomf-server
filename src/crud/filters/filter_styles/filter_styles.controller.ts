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
import { FilterStylesService } from './filter_styles.service';
import { FilterStyle } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterStyle as FilterStyleEntity } from './entities/FilterStyle';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreateFilterStyleDto,
  UpdateFilterStyleDto,
} from './dto/filter-style.dto';

@ApiTags('Filter Styles')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('filter-styles')
export class FilterStylesController {
  constructor(private readonly filterStylesService: FilterStylesService) {}

  @ApiOperation({ summary: 'Получить все фильтры стилей' })
  @ApiResponse({ status: 200, type: [FilterStyleEntity] })
  @Public()
  @Get('')
  async getFilterStyles(): Promise<FilterStyle[]> {
    return this.filterStylesService.getFilterStyles();
  }

  @ApiOperation({ summary: 'Создать фильтр стиля' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: FilterStyleEntity })
  @AdminAccess()
  @Post('')
  async createFilterStyle(
    @Body() dto: CreateFilterStyleDto,
  ): Promise<FilterStyle> {
    return this.filterStylesService.createFilterStyle(dto);
  }

  @ApiOperation({ summary: 'Обновить фильтр стиля' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: FilterStyleEntity })
  @AdminAccess()
  @Patch(':id')
  async updateFilterStyle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilterStyleDto,
  ): Promise<FilterStyle> {
    return this.filterStylesService.updateFilterStyle(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильтр стиля' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteFilterStyle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.filterStylesService.deleteFilterStyle(id);
    return { success: true };
  }
}
