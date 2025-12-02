import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import {Image} from "../../shared/entities/Image";

@Entity()
export class PortfolioImagesList {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Portfolio, portfolio => portfolio.id)
    work: Portfolio;

    @ManyToOne(() => Image, image => image.id)
    image: Image;
}