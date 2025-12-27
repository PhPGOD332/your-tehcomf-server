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
  readonly description: string | null;
  readonly images: Image[];
  readonly type: FilterType | null;
  readonly style: FilterStyle | null;
  readonly layout: FilterLayout | null;
  readonly sizesRoom: string | null;
  readonly sizesFurniture: string | null;
  readonly housingMaterial: string | null;
  readonly facadeMaterial: string | null;
  readonly tableTopMaterial: string | null;
  readonly bodyColor: Color | null;
  readonly facadeColors: Color[];
  readonly tableTopColor: Color | null;
  readonly furnitureAccessories: string | null;
  readonly price: number;

  constructor(portfolio: PortfolioWithRelations) {
    this.id = portfolio.id;
    this.name = portfolio.name;
    this.title = portfolio.title;
    this.description = portfolio.description ?? null;
    this.images = (portfolio.imagesList ?? [])
      .map((list) => list.image)
      .filter((image): image is Image => Boolean(image));

    this.type = portfolio.type;
    this.style = portfolio.style;
    this.layout = portfolio.layout;
    this.sizesRoom = portfolio.sizesRoom ?? null;
    this.sizesFurniture = portfolio.sizesFurniture ?? null;
    this.housingMaterial = portfolio.housingMaterial ?? null;
    this.facadeMaterial = portfolio.facadeMaterial ?? null;
    this.tableTopMaterial = portfolio.tableTopMaterial ?? null;
    this.bodyColor = portfolio.bodyColor;

    this.facadeColors = (portfolio.colorsList ?? [])
      .map((list) => list.color)
      .filter((color): color is Color => Boolean(color));

    this.tableTopColor = portfolio.tableTopColor;
    this.furnitureAccessories = portfolio.furnitureAccessories ?? null;
    this.price = portfolio.price;
  }
}
