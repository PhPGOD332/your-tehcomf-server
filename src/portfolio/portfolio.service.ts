import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database';
import { Prisma } from '@prisma/client';
import { PortfolioDto } from './dto/PortfolioDto';
import { TFilterType } from '@/shared';

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

    return portfolios.map((portfolio) => new PortfolioDto(portfolio));
  }

  async getPortfolioItem(name: string): Promise<PortfolioDto | null> {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { name },
      include: this.buildPortfolioInclude(),
    });

    if (!portfolio) {
      return null;
    }

    return new PortfolioDto(portfolio);
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
}
