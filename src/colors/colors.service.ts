import { Injectable } from '@nestjs/common';
import { Color } from '@prisma/client';
import { PrismaService } from '@/database';

@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getColors(): Promise<Color[]> {
    return this.prisma.color.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
