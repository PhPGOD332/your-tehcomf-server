import { Injectable } from '@nestjs/common';
import { FilterType } from '@prisma/client';
import { PrismaService } from '@/database';

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
}
