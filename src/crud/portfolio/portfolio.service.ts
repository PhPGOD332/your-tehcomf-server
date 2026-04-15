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
        await this.createPortfolioColorLinks(
          tx,
          portfolio.id,
          dto.facadeColorIds,
        );
      }

      if (dto.imageIds?.length) {
        await this.createPortfolioImageLinks(tx, portfolio.id, dto.imageIds);
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
          await this.createPortfolioColorLinks(tx, id, dto.facadeColorIds);
        }
      }

      if (dto.imageIds) {
        await tx.portfolioImagesList.deleteMany({ where: { workId: id } });

        if (dto.imageIds.length) {
          await this.createPortfolioImageLinks(tx, id, dto.imageIds);
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

  private async createPortfolioColorLinks(
    tx: Prisma.TransactionClient,
    workId: number,
    colorIds: number[],
  ): Promise<void> {
    await this.createManyWithIdRetry(
      () =>
        tx.portfolioColorsList.createMany({
          data: colorIds.map((colorId) => ({
            workId,
            colorId,
          })),
        }),
      () => this.resyncPortfolioColorsListIdSequence(tx),
    );
  }

  private async createPortfolioImageLinks(
    tx: Prisma.TransactionClient,
    workId: number,
    imageIds: number[],
  ): Promise<void> {
    await this.createManyWithIdRetry(
      () =>
        tx.portfolioImagesList.createMany({
          data: imageIds.map((imageId) => ({
            workId,
            imageId,
          })),
        }),
      () => this.resyncPortfolioImagesListIdSequence(tx),
    );
  }

  private async createManyWithIdRetry(
    action: () => Promise<Prisma.BatchPayload>,
    resyncIdSequence: () => Promise<void>,
  ): Promise<void> {
    try {
      await action();
    } catch (error) {
      if (!this.isDuplicateIdError(error)) {
        throw error;
      }

      await resyncIdSequence();
      await action();
    }
  }

  private isDuplicateIdError(error: unknown): boolean {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
      return false;
    }

    if (error.code !== 'P2002') {
      return false;
    }

    const target = error.meta?.target;

    if (Array.isArray(target)) {
      return target.includes('id');
    }

    return typeof target === 'string' && target.includes('id');
  }

  private async resyncPortfolioColorsListIdSequence(
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await tx.$executeRaw`
      SELECT setval(
        pg_get_serial_sequence('"portfolio_colors_list"', 'id'),
        COALESCE((SELECT MAX(id) FROM "portfolio_colors_list"), 0) + 1,
        false
      );
    `;
  }

  private async resyncPortfolioImagesListIdSequence(
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await tx.$executeRaw`
      SELECT setval(
        pg_get_serial_sequence('"portfolio_images_list"', 'id'),
        COALESCE((SELECT MAX(id) FROM "portfolio_images_list"), 0) + 1,
        false
      );
    `;
  }
}
