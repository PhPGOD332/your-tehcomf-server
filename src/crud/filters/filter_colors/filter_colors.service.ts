import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterColor } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import {
  CreateFilterColorDto,
  UpdateFilterColorDto,
} from './dto/filter-color.dto';

@Injectable()
export class FilterColorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilterColors(): Promise<FilterColor[]> {
    return this.prisma.filterColor.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async createFilterColor(dto: CreateFilterColorDto): Promise<FilterColor> {
    return this.prisma.filterColor.create({ data: dto });
  }

  async updateFilterColor(
    id: number,
    dto: UpdateFilterColorDto,
  ): Promise<FilterColor> {
    await this.ensureFilterColorExists(id);
    return this.prisma.filterColor.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFilterColor(id: number): Promise<void> {
    await this.ensureFilterColorExists(id);
    await this.prisma.filterColor.delete({ where: { id } });
  }

  private async ensureFilterColorExists(id: number): Promise<void> {
    const filterColor = await this.prisma.filterColor.findUnique({
      where: { id },
    });

    if (!filterColor) {
      throw new NotFoundException(`Фильтр цвета с id=${id} не найден`);
    }
  }
}
