import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nsi_filter_budgets')
export class FilterBudget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'min_value',
  })
  minValue: number;

  @Column({
    name: 'max_value',
  })
  maxValue: number;

  @Column()
  caption: string;

  @Column()
  type: 'budget';

  @Column()
  order: number;
}
