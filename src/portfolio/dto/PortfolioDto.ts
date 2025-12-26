import type {
  Color,
  FilterLayout,
  FilterStyle,
  FilterType,
  Image,
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from '@prisma/client';

export type PortfolioWithRelations = Portfolio & {
  type: FilterType | null;
  style: FilterStyle | null;
  layout: FilterLayout | null;
  bodyColor: Color | null;
  tableTopColor: Color | null;
  colorsList: (PortfolioColorsList & { color: Color | null })[];
  imagesList: (PortfolioImagesList & { image: Image | null })[];
};

export class PortfolioDto {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly images: Image[];
  readonly type: FilterType | null;
  readonly style: FilterStyle | null;
  readonly layout: FilterLayout | null;
  readonly sizesRoom: string;
  readonly sizesFurniture: string;
  readonly housingMaterial: string;
  readonly facadeMaterial: string;
  readonly tableTopMaterial: string;
  readonly bodyColor: Color | null;
  readonly facadeColors: Color[];
  readonly tableTopColor: Color | null;
  readonly furnitureAccessories: string;
  readonly price: number;

  constructor(portfolio: PortfolioWithRelations) {
    this.id = portfolio.id;
    this.name = portfolio.name;
    this.title = portfolio.title;
    this.description = portfolio.description;
    this.images = (portfolio.imagesList ?? [])
      .map((list) => list.image)
      .filter((image): image is Image => Boolean(image));

    this.type = portfolio.type;
    this.style = portfolio.style;
    this.layout = portfolio.layout;
    this.sizesRoom = portfolio.sizesRoom;
    this.sizesFurniture = portfolio.sizesFurniture;
    this.housingMaterial = portfolio.housingMaterial;
    this.facadeMaterial = portfolio.facadeMaterial;
    this.tableTopMaterial = portfolio.tableTopMaterial;
    this.bodyColor = portfolio.bodyColor;

    this.facadeColors = (portfolio.colorsList ?? [])
      .map((list) => list.color)
      .filter((color): color is Color => Boolean(color));

    this.tableTopColor = portfolio.tableTopColor;
    this.furnitureAccessories = portfolio.furnitureAccessories;
    this.price = portfolio.price;
  }
}
