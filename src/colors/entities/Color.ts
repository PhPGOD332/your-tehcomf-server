import { Portfolio } from '@/portfolio/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nsi_colors')
export class Color {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  caption: string;

  @ApiProperty()
  @Column({
    name: 'caption_for_page',
  })
  captionForPage: string;

  @ApiProperty()
  @Column({
    name: 'hex_code',
  })
  hexCode: string;

  @ApiProperty()
  @OneToMany(() => Portfolio, (portfolio) => portfolio.bodyColor)
  portfoliosBodyColor: Portfolio[];

  @ApiProperty()
  @OneToMany(() => Portfolio, (portfolio) => portfolio.tableTopColor)
  portfoliosTableTopColor: Portfolio[];
}
