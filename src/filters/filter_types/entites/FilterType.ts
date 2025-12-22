import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '../../../portfolio/entities/Portfolio';

@Entity('nsi_filter_types')
export class FilterType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  caption: string;

  @Column()
  type: 'type';

  @OneToMany(() => Portfolio, (portfolio) => portfolio.type)
  portfolioType: Portfolio[];
}
