import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Color } from '@prisma/client';
import { ColorEntity } from './entities/Color';
import { Public } from '@/auth/decorators/public.decorator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto';

@ApiTags('Colors')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiOperation({ summary: 'Получить все цвета' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех цветов',
    type: [ColorEntity],
  })
  @Public()
  @Get('')
  async getColors(): Promise<Color[]> {
    return this.colorsService.getColors();
  }

  @ApiOperation({ summary: 'Создать цвет' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.CREATED, type: ColorEntity })
  @AdminAccess()
  @Post('')
  async createColor(@Body() dto: CreateColorDto): Promise<Color> {
    return this.colorsService.createColor(dto);
  }

  @ApiOperation({ summary: 'Обновить цвет' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, type: ColorEntity })
  @AdminAccess()
  @Patch(':id')
  async updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorsService.updateColor(id, dto);
  }

  @ApiOperation({ summary: 'Удалить цвет' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: { success: true } },
  })
  @AdminAccess()
  @Delete(':id')
  async deleteColor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.colorsService.deleteColor(id);
    return { success: true };
  }
}
