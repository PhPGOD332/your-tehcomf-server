import type {
  Color,
  FilterColor,
  FilterLayout,
  FilterStyle,
  FilterType,
  Image,
  Portfolio,
  PortfolioColorsList,
  PortfolioImagesList,
} from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Image as ImageEntity } from '@/shared/entities/Image';
import { ColorEntity } from '@/crud/colors';

export type PortfolioWithRelations = Portfolio & {
  type: FilterType | null;
  style: FilterStyle | null;
  layout: FilterLayout | null;
  color: FilterColor | null;
  bodyColor: Color | null;
  tableTopColor: Color | null;
  colorsList: (PortfolioColorsList & { color: Color | null })[];
  imagesList: (PortfolioImagesList & { image: Image | null })[];
};

export class PortfolioDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly title: string;

  @ApiPropertyOptional()
  readonly subtitle: string | null;

  @ApiPropertyOptional()
  readonly description: string | null;

  @ApiProperty({ type: [ImageEntity] })
  readonly images: Image[];

  @ApiPropertyOptional({ type: Object })
  readonly type: FilterType | null;

  @ApiPropertyOptional({ type: Object })
  readonly style: FilterStyle | null;

  @ApiPropertyOptional({ type: Object })
  readonly layout: FilterLayout | null;

  @ApiPropertyOptional({ type: Object })
  readonly color: FilterColor | null;

  @ApiPropertyOptional()
  readonly sizesRoom: string | null;

  @ApiPropertyOptional()
  readonly sizesFurniture: string | null;

  @ApiPropertyOptional()
  readonly housingMaterial: string | null;

  @ApiPropertyOptional()
  readonly facadeMaterial: string | null;

  @ApiPropertyOptional()
  readonly tableTopMaterial: string | null;

  @ApiPropertyOptional({ type: ColorEntity })
  readonly bodyColor: Color | null;

  @ApiProperty({ type: [ColorEntity] })
  readonly facadeColors: Color[];

  @ApiPropertyOptional({ type: ColorEntity })
  readonly tableTopColor: Color | null;

  @ApiPropertyOptional()
  readonly furnitureAccessories: string | null;

  @ApiProperty()
  readonly price: number;

  constructor(portfolio: PortfolioWithRelations) {
    this.id = portfolio.id;
    this.name = portfolio.name;
    this.title = portfolio.title;
    this.subtitle = portfolio.subtitle ?? null;
    this.description = portfolio.description ?? null;
    this.images = (portfolio.imagesList ?? [])
      .map((list) => list.image)
      .filter((image): image is Image => Boolean(image));

    this.type = portfolio.type;
    this.style = portfolio.style;
    this.layout = portfolio.layout;
    this.color = portfolio.color;
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
