import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "../../portfolio/entities/Portfolio";

@Entity('nsi_filter_styles')
export class FilterStyle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    caption: string;

    @Column()
    type: 'style';

    @Column()
    order: number;

    @OneToMany(() => Portfolio, portfolio => portfolio.style)
    portfolioStyle: Portfolio[];
}