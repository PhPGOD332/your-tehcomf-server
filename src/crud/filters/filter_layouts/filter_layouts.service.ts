import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterLayout } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import {
  CreateFilterLayoutDto,
  UpdateFilterLayoutDto,
} from './dto/filter-layout.dto';

@Injectable()
export class FilterLayoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilterLayouts(): Promise<FilterLayout[]> {
    return this.prisma.filterLayout.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async createFilterLayout(dto: CreateFilterLayoutDto): Promise<FilterLayout> {
    return this.prisma.filterLayout.create({ data: dto });
  }

  async updateFilterLayout(
    id: number,
    dto: UpdateFilterLayoutDto,
  ): Promise<FilterLayout> {
    await this.ensureFilterLayoutExists(id);
    return this.prisma.filterLayout.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFilterLayout(id: number): Promise<void> {
    await this.ensureFilterLayoutExists(id);
    await this.prisma.filterLayout.delete({ where: { id } });
  }

  private async ensureFilterLayoutExists(id: number): Promise<void> {
    const filterLayout = await this.prisma.filterLayout.findUnique({
      where: { id },
    });

    if (!filterLayout) {
      throw new NotFoundException(`Фильтр планировки с id=${id} не найден`);
    }
  }
}
