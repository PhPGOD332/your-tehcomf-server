import { Injectable } from '@nestjs/common';
import { FilterColor } from '@prisma/client';
import { PrismaService } from '@/database';

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
}
