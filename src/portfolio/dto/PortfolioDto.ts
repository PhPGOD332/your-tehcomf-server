import { Portfolio } from '../entities/Portfolio';
import { PortfolioColorsList } from '../entities/PortfolioColorsList';
import { Image } from '../../shared/entities/Image';
import { FilterType } from '../../filter_types/entites/FilterType';
import { Color } from '../../colors/entities/Color';
import { FilterLayout } from '../../filter_layouts/entities/FilterLayout';
import { PortfolioImagesList } from '../entities/PortfolioImagesList';

export class PortfolioDto {
  readonly id: number;
  readonly name: string;
  readonly title: string;
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
