import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterType } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import {
  CreateFilterTypeDto,
  UpdateFilterTypeDto,
} from './dto/filter-type.dto';

export type FilterTypeWithOrder = FilterType & { order: number };

@Injectable()
export class FilterTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilterTypes(): Promise<FilterTypeWithOrder[]> {
    const types = await this.prisma.filterType.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return types.map((type, index) => ({
      ...type,
      order: index + 1,
    }));
  }

  async createFilterType(dto: CreateFilterTypeDto): Promise<FilterType> {
    return this.prisma.filterType.create({ data: dto });
  }

  async updateFilterType(
    id: number,
    dto: UpdateFilterTypeDto,
  ): Promise<FilterType> {
    await this.ensureFilterTypeExists(id);
    return this.prisma.filterType.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFilterType(id: number): Promise<void> {
    await this.ensureFilterTypeExists(id);
    await this.prisma.filterType.delete({ where: { id } });
  }

  private async ensureFilterTypeExists(id: number): Promise<void> {
    const filterType = await this.prisma.filterType.findUnique({
      where: { id },
    });

    if (!filterType) {
      throw new NotFoundException(`Фильтр типа с id=${id} не найден`);
    }
  }
}
