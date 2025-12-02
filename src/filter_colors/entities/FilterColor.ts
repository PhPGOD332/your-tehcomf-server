import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('nsi_filter_colors')
export class FilterColor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    caption: string;

    @Column()
    type: 'color';
}