import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/crud/database';
import { Prisma } from '@prisma/client';
import { PortfolioDto, PortfolioWithRelations } from './dto/PortfolioDto';
import { TFilterType } from '@/shared';
import { resolveAbsoluteMediaUrl } from '@/common/media-url.util';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPortfolios(
    filters?: { name: TFilterType; value: string }[],
  ): Promise<PortfolioDto[]> {
    const where = await this.buildFilters(filters);

    const portfolios = await this.prisma.portfolio.findMany({
      where,
      include: this.buildPortfolioInclude(),
      orderBy: {
        id: 'asc',
      },
    });

    return portfolios.map(
      (portfolio) =>
        new PortfolioDto(this.normalizePortfolioImageUrls(portfolio)),
    );
  }

  async getPortfolioItem(name: string): Promise<PortfolioDto | null> {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { name },
      include: this.buildPortfolioInclude(),
    });

    if (!portfolio) {
      return null;
    }

    return new PortfolioDto(this.normalizePortfolioImageUrls(portfolio));
  }

  async getPortfolioById(id: number): Promise<PortfolioDto> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: this.buildPortfolioInclude(),
    });

    if (!portfolio) {
      throw new NotFoundException(`Портфолио с id=${id} не найдено`);
    }

    return new PortfolioDto(this.normalizePortfolioImageUrls(portfolio));
  }

  async createPortfolio(dto: CreatePortfolioDto): Promise<PortfolioDto> {
    const createdPortfolio = await this.prisma.$transaction(async (tx) => {
      const portfolio = await tx.portfolio.create({
        data: {
          name: dto.name,
          title: dto.title,
          subtitle: dto.subtitle,
          description: dto.description,
          price: dto.price,
          typeId: dto.typeId,
          styleId: dto.styleId,
          layoutId: dto.layoutId,
          colorId: dto.colorId,
          bodyColorId: dto.bodyColorId,
          tableTopColorId: dto.tableTopColorId,
          sizesRoom: dto.sizesRoom,
          sizesFurniture: dto.sizesFurniture,
          housingMaterial: dto.housingMaterial,
          facadeMaterial: dto.facadeMaterial,
          tableTopMaterial: dto.tableTopMaterial,
          furnitureAccessories: dto.furnitureAccessories,
        },
      });

      if (dto.facadeColorIds?.length) {
        await tx.portfolioColorsList.createMany({
          data: dto.facadeColorIds.map((colorId) => ({
            workId: portfolio.id,
            colorId,
          })),
        });
      }

      if (dto.imageIds?.length) {
        await tx.portfolioImagesList.createMany({
          data: dto.imageIds.map((imageId) => ({
            workId: portfolio.id,
            imageId,
          })),
        });
      }

      return tx.portfolio.findUniqueOrThrow({
        where: { id: portfolio.id },
        include: this.buildPortfolioInclude(),
      });
    });

    return new PortfolioDto(this.normalizePortfolioImageUrls(createdPortfolio));
  }

  async updatePortfolio(
    id: number,
    dto: UpdatePortfolioDto,
  ): Promise<PortfolioDto> {
    await this.ensurePortfolioExists(id);

    const updatedPortfolio = await this.prisma.$transaction(async (tx) => {
      await tx.portfolio.update({
        where: { id },
        data: {
          name: dto.name,
          title: dto.title,
          subtitle: dto.subtitle,
          description: dto.description,
          price: dto.price,
          typeId: dto.typeId,
          styleId: dto.styleId,
          layoutId: dto.layoutId,
          colorId: dto.colorId,
          bodyColorId: dto.bodyColorId,
          tableTopColorId: dto.tableTopColorId,
          sizesRoom: dto.sizesRoom,
          sizesFurniture: dto.sizesFurniture,
          housingMaterial: dto.housingMaterial,
          facadeMaterial: dto.facadeMaterial,
          tableTopMaterial: dto.tableTopMaterial,
          furnitureAccessories: dto.furnitureAccessories,
        },
      });

      if (dto.facadeColorIds) {
        await tx.portfolioColorsList.deleteMany({ where: { workId: id } });

        if (dto.facadeColorIds.length) {
          await tx.portfolioColorsList.createMany({
            data: dto.facadeColorIds.map((colorId) => ({
              workId: id,
              colorId,
            })),
          });
        }
      }

      if (dto.imageIds) {
        await tx.portfolioImagesList.deleteMany({ where: { workId: id } });

        if (dto.imageIds.length) {
          await tx.portfolioImagesList.createMany({
            data: dto.imageIds.map((imageId) => ({
              workId: id,
              imageId,
            })),
          });
        }
      }

      return tx.portfolio.findUniqueOrThrow({
        where: { id },
        include: this.buildPortfolioInclude(),
      });
    });

    return new PortfolioDto(this.normalizePortfolioImageUrls(updatedPortfolio));
  }

  async deletePortfolio(id: number): Promise<void> {
    await this.ensurePortfolioExists(id);

    await this.prisma.$transaction(async (tx) => {
      await tx.portfolioColorsList.deleteMany({ where: { workId: id } });
      await tx.portfolioImagesList.deleteMany({ where: { workId: id } });
      await tx.portfolio.delete({ where: { id } });
    });
  }

  private buildPortfolioInclude() {
    return {
      type: true,
      layout: true,
      style: true,
      color: true,
      bodyColor: true,
      tableTopColor: true,
      colorsList: {
        include: {
          color: true,
        },
      },
      imagesList: {
        include: {
          image: true,
        },
        orderBy: {
          image: {
            order: 'asc',
          },
        },
      },
    } satisfies Prisma.PortfolioInclude;
  }

  private async buildFilters(
    filters?: { name: TFilterType; value: string }[],
  ): Promise<Prisma.PortfolioWhereInput | undefined> {
    if (!filters || filters.length === 0) {
      return undefined;
    }

    const clauses: Prisma.PortfolioWhereInput[] = [];

    for (const filter of filters) {
      const clause = await this.buildFilterClause(filter.name, filter.value);
      if (clause) {
        clauses.push(clause);
      }
    }

    if (clauses.length === 0) {
      return undefined;
    }

    return { AND: clauses };
  }

  private async buildFilterClause(
    filterProperty: TFilterType,
    filterValue: string,
  ): Promise<Prisma.PortfolioWhereInput | undefined> {
    const normalizedValue = filterValue.trim();

    if (!normalizedValue) {
      return undefined;
    }

    switch (filterProperty) {
      case 'type':
        return { type: { name: normalizedValue } };
      case 'style':
        return { style: { name: normalizedValue } };
      case 'layout':
        return { layout: { name: normalizedValue } };
      case 'color':
        return {
          color: { name: normalizedValue },
          // OR: [
          // { bodyColor: { name: normalizedValue } },
          // { tableTopColor: { name: normalizedValue } },
          // { colorsList: { some: { color: { name: normalizedValue } } } },
          // ],
        };
      case 'budget':
        return this.findBudgetFilter(normalizedValue);
      default:
        return undefined;
    }
  }

  private async findBudgetFilter(
    value: string,
  ): Promise<Prisma.PortfolioWhereInput | undefined> {
    const asNumber = Number(value);

    if (!Number.isNaN(asNumber)) {
      const budgetById = await this.prisma.filterBudget.findFirst({
        where: { id: asNumber },
      });

      if (budgetById) {
        const minBudgetValue = budgetById.minValue ?? undefined;
        const maxBudgetValue = budgetById.maxValue ?? undefined;

        return {
          price: {
            ...(minBudgetValue !== undefined ? { gte: minBudgetValue } : {}),
            ...(maxBudgetValue !== undefined ? { lte: maxBudgetValue } : {}),
          },
        };
      }
    }

    const budgetByName = await this.prisma.filterBudget.findFirst({
      where: {
        OR: [{ name: value }, { caption: value }],
      },
    });

    if (!budgetByName) {
      return undefined;
    }

    const minBudgetValue = budgetByName.minValue ?? undefined;
    const maxBudgetValue = budgetByName.maxValue ?? undefined;

    return {
      price: {
        ...(minBudgetValue !== undefined ? { gte: minBudgetValue } : {}),
        ...(maxBudgetValue !== undefined ? { lte: maxBudgetValue } : {}),
      },
    };
  }

  private normalizePortfolioImageUrls(
    portfolio: PortfolioWithRelations,
  ): PortfolioWithRelations {
    const apiUrl = process.env.API_URL;

    return {
      ...portfolio,
      imagesList: (portfolio.imagesList ?? []).map((list) => ({
        ...list,
        image: list.image
          ? {
              ...list.image,
              src: resolveAbsoluteMediaUrl(list.image.src, apiUrl),
            }
          : null,
      })),
    };
  }

  private async ensurePortfolioExists(id: number): Promise<void> {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });

    if (!portfolio) {
      throw new NotFoundException(`Портфолио с id=${id} не найдено`);
    }
  }
}
