import type { Image } from '@/shared';
import type { FilterLayout, FilterType } from '@/filters';
import type { Color } from '@/colors';
import type {
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from '../entities';

export class PortfolioDto {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly images: Image[];
  readonly type: FilterType;
  readonly style: string;
  readonly layout: FilterLayout;
  readonly sizesRoom: string;
  readonly sizesFurniture: string;
  readonly housingMaterial: string;
  readonly facadeMaterial: string;
  readonly tableTopMaterial: string;
  readonly bodyColor: Color;
  readonly facadeColors: Color[];
  readonly tableTopColor: Color;
  readonly furnitureAccessories: string;
  readonly price: number;

  constructor(
    portfolio: Portfolio,
    portfolioColorsList: PortfolioColorsList[],
    portfolioImagesList: PortfolioImagesList[],
  ) {
    this.id = portfolio.id;
    this.name = portfolio.name;
    this.title = portfolio.title;
    this.description = portfolio.description;
    this.images = portfolioImagesList.map((list) => list.image);

    this.type = portfolio.type;
    this.style = portfolio.style;
    this.layout = portfolio.layout;
    this.sizesRoom = portfolio.sizesRoom;
    this.sizesFurniture = portfolio.sizesFurniture;
    this.housingMaterial = portfolio.housingMaterial;
    this.facadeMaterial = portfolio.facadeMaterial;
    this.tableTopMaterial = portfolio.tableTopMaterial;
    this.bodyColor = portfolio.bodyColor;

    this.facadeColors = portfolioColorsList.map((list) => {
      return list.color;
    });

    this.tableTopColor = portfolio.tableTopColor;
    this.furnitureAccessories = portfolio.furnitureAccessories;
    this.price = portfolio.price;
  }
}
