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
import {
  FilterTypesService,
  FilterTypeWithOrder,
} from './filter_types.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterType as FilterTypeModel } from '@prisma/client';
import { FilterType } from './entites/FilterType';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import {
  CreateFilterTypeDto,
  UpdateFilterTypeDto,
} from './dto/filter-type.dto';

@ApiTags('Filter Types')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('filter-types')
export class FilterTypesController {
  constructor(private readonly filterTypesService: FilterTypesService) {}

  @ApiOperation({ summary: 'Получить все фильтры типов' })
  @ApiResponse({ status: 200, type: [FilterType] })
  @Public()
  @Get('')
  async getFilterTypes(): Promise<FilterTypeWithOrder[]> {
    return this.filterTypesService.getFilterTypes();
  }

  @ApiOperation({ summary: 'Создать фильтр типа' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, type: FilterType })
  @AdminAccess()
  @Post('')
  async createFilterType(
    @Body() dto: CreateFilterTypeDto,
  ): Promise<FilterTypeModel> {
    return this.filterTypesService.createFilterType(dto);
  }

  @ApiOperation({ summary: 'Обновить фильтр типа' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, type: FilterType })
  @AdminAccess()
  @Patch(':id')
  async updateFilterType(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilterTypeDto,
  ): Promise<FilterTypeModel> {
    return this.filterTypesService.updateFilterType(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильтр типа' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @AdminAccess()
  @Delete(':id')
  async deleteFilterType(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.filterTypesService.deleteFilterType(id);
    return { success: true };
  }
}
