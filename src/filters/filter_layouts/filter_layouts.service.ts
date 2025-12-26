import { Injectable } from '@nestjs/common';
import { FilterLayout } from '@prisma/client';
import { PrismaService } from '@/database';

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
}
