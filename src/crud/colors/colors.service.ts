import { Injectable, NotFoundException } from '@nestjs/common';
import { Color } from '@prisma/client';
import { PrismaService } from '@/crud/database';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto';

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

  async createColor(dto: CreateColorDto): Promise<Color> {
    return this.prisma.color.create({ data: dto });
  }

  async updateColor(id: number, dto: UpdateColorDto): Promise<Color> {
    await this.ensureColorExists(id);
    return this.prisma.color.update({
      where: { id },
      data: dto,
    });
  }

  async deleteColor(id: number): Promise<void> {
    await this.ensureColorExists(id);
    await this.prisma.color.delete({ where: { id } });
  }

  private async ensureColorExists(id: number): Promise<void> {
    const color = await this.prisma.color.findUnique({ where: { id } });

    if (!color) {
      throw new NotFoundException(`Цвет с id=${id} не найден`);
    }
  }
}
