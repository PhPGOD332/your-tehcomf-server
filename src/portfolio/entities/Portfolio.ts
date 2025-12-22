import { Color } from '@/colors';
import { FilterLayout, FilterType } from '@/filters';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioColorsList } from './PortfolioColorsList';
import { PortfolioImagesList } from './PortfolioImagesList';
import { ApiProperty } from '@nestjs/swagger';

@Entity('portfolio')
export class Portfolio {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  // @ManyToOne(() => Image, image => image.id)
  // @JoinColumn({
  //     name: 'main_image'
  // })
  // mainImage: Image;

  @ApiProperty()
  @ManyToOne(() => FilterType, (type) => type.id)
  @JoinColumn({
    name: 'type',
  })
  type: FilterType;

  @ApiProperty()
  @Column()
  style: string;

  @ApiProperty()
  @ManyToOne(() => FilterLayout, (layout) => layout.id)
  @JoinColumn({
    name: 'layout',
  })
  layout: FilterLayout;

  @ApiProperty()
  @Column({
    name: 'sizes_room',
  })
  sizesRoom: string;

  @ApiProperty()
  @Column({
    name: 'sizes_furniture',
  })
  sizesFurniture: string;

  @ApiProperty()
  @Column({
    name: 'housing_material',
  })
  housingMaterial: string;

  @ApiProperty()
  @Column({
    name: 'facade_material',
  })
  facadeMaterial: string;

  @ApiProperty()
  @Column({
    name: 'table_top_material',
  })
  tableTopMaterial: string;

  @ApiProperty()
  @ManyToOne(() => Color, (color) => color.id)
  @JoinColumn({
    name: 'body_color',
  })
  bodyColor: Color;

  @ApiProperty()
  @ManyToOne(() => Color, (color) => color.id)
  @JoinColumn({
    name: 'table_top_color',
  })
  tableTopColor: Color;

  @ApiProperty()
  @Column({
    name: 'furniture_accessories',
  })
  furnitureAccessories: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @OneToMany(() => PortfolioColorsList, (list) => list.work)
  portfolioColorsList: PortfolioColorsList;

  @ApiProperty()
  @OneToMany(() => PortfolioImagesList, (list) => list.work)
  portfolioImagesList: PortfolioImagesList;
}
