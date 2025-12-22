import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '../../../portfolio/entities/Portfolio';

@Entity('nsi_filter_layouts')
export class FilterLayout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  caption: string;

  @Column()
  type: 'layout';

  @Column()
  order: number;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.style)
  portfolioLayout: Portfolio[];
}
