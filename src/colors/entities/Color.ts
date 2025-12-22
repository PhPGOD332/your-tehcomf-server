import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '../../portfolio/entities/Portfolio';

@Entity('nsi_colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  caption: string;

  @Column({
    name: 'caption_for_page',
  })
  captionForPage: string;

  @Column({
    name: 'hex_code',
  })
  hexCode: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.bodyColor)
  portfoliosBodyColor: Portfolio[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.tableTopColor)
  portfoliosTableTopColor: Portfolio[];
}
