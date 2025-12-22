import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nsi_images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'image',
  })
  src: string;

  @Column({
    name: 'image_alt',
  })
  imageAlt: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  order: number;
}
