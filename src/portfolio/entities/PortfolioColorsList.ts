import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import {Color} from "../../colors/entities/Color";

@Entity('portfolio_colors_list')
export class PortfolioColorsList {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Portfolio, portfolio => portfolio.id)
    @JoinColumn({
        name: 'work'
    })
    work: Portfolio;

    @ManyToOne(() => Color, color => color.id)
    @JoinColumn({
        name: 'color'
    })
    color: Color;
}