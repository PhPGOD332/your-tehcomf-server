import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './Portfolio';
import { Image } from '@/shared';

@Entity('portfolio_images_list')
export class PortfolioImagesList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.id)
  @JoinColumn({
    name: 'work',
  })
  work: Portfolio;

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({
    name: 'image',
  })
  image: Image;
}
