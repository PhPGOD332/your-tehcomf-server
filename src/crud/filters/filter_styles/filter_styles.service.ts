import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterStyle } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import {
  CreateFilterStyleDto,
  UpdateFilterStyleDto,
} from './dto/filter-style.dto';

@Injectable()
export class FilterStylesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilterStyles(): Promise<FilterStyle[]> {
    return this.prisma.filterStyle.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async createFilterStyle(dto: CreateFilterStyleDto): Promise<FilterStyle> {
    return this.prisma.filterStyle.create({ data: dto });
  }

  async updateFilterStyle(
    id: number,
    dto: UpdateFilterStyleDto,
  ): Promise<FilterStyle> {
    await this.ensureFilterStyleExists(id);
    return this.prisma.filterStyle.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFilterStyle(id: number): Promise<void> {
    await this.ensureFilterStyleExists(id);
    await this.prisma.filterStyle.delete({ where: { id } });
  }

  private async ensureFilterStyleExists(id: number): Promise<void> {
    const filterStyle = await this.prisma.filterStyle.findUnique({
      where: { id },
    });

    if (!filterStyle) {
      throw new NotFoundException(`Фильтр стиля с id=${id} не найден`);
    }
  }
}
