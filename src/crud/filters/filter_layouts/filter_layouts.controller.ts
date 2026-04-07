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
import { FilterLayoutsService } from './filter_layouts.service';
import { FilterLayout } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterLayout as FilterLayoutEntity } from './entities/FilterLayout';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreateFilterLayoutDto,
  UpdateFilterLayoutDto,
} from './dto/filter-layout.dto';

@ApiTags('Filter Layouts')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('filter-layouts')
export class FilterLayoutsController {
  constructor(private readonly filterStylesLayout: FilterLayoutsService) {}

  @ApiOperation({ summary: 'Получить все фильтры планировок' })
  @ApiResponse({ status: 200, type: [FilterLayoutEntity] })
  @Public()
  @Get('')
  async getFilterStyles(): Promise<FilterLayout[]> {
    return this.filterStylesLayout.getFilterLayouts();
  }

  @ApiOperation({ summary: 'Создать фильтр планировки' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: FilterLayoutEntity })
  @AdminAccess()
  @Post('')
  async createFilterLayout(
    @Body() dto: CreateFilterLayoutDto,
  ): Promise<FilterLayout> {
    return this.filterStylesLayout.createFilterLayout(dto);
  }

  @ApiOperation({ summary: 'Обновить фильтр планировки' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: FilterLayoutEntity })
  @AdminAccess()
  @Patch(':id')
  async updateFilterLayout(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilterLayoutDto,
  ): Promise<FilterLayout> {
    return this.filterStylesLayout.updateFilterLayout(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильтр планировки' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteFilterLayout(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.filterStylesLayout.deleteFilterLayout(id);
    return { success: true };
  }
}
