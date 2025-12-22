import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FilterType} from "../../filter_types/entites/FilterType";
import {Color} from "../../colors/entities/Color";
import {PortfolioColorsList} from "./PortfolioColorsList";
import {Image} from "../../shared/entities/Image";
import {PortfolioImagesList} from "./PortfolioImagesList";
import {FilterLayout} from "../../filter_layouts/entities/FilterLayout";

@Entity('portfolio')
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;

    // @ManyToOne(() => Image, image => image.id)
    // @JoinColumn({
    //     name: 'main_image'
    // })
    // mainImage: Image;

    @ManyToOne(() => FilterType, type => type.id)
    @JoinColumn({
        name: 'type'
    })
    type: FilterType;

    @Column()
    style: string;

    @ManyToOne(() => FilterLayout, layout => layout.id)
    @JoinColumn({
        name: 'layout'
    })
    layout: FilterLayout;

    @Column({
        name: 'sizes_room'
    })
    sizesRoom: string;

    @Column({
        name: 'sizes_furniture'
    })
    sizesFurniture: string;

    @Column({
        name: 'housing_material'
    })
    housingMaterial: string;

    @Column({
        name: 'facade_material'
    })
    facadeMaterial: string;

    @Column({
        name: 'table_top_material'
    })
    tableTopMaterial: string;

    @ManyToOne(() => Color, color => color.id)
    @JoinColumn({
        name: 'body_color'
    })
    bodyColor: Color;

    @ManyToOne(() => Color, color => color.id)
    @JoinColumn({
        name: 'table_top_color'
    })
    tableTopColor: Color;

    @Column({
        name: 'furniture_accessories'
    })
    furnitureAccessories: string;

    @Column()
    price: number;

    @OneToMany(() => PortfolioColorsList, list => list.work)
    portfolioColorsList: PortfolioColorsList;

    @OneToMany(() => PortfolioImagesList, list => list.work)
    portfolioImagesList: PortfolioImagesList;
}