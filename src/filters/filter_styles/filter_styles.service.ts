import { Injectable } from '@nestjs/common';
import { FilterStyle } from '@prisma/client';
import { PrismaService } from '@/database';

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
}
