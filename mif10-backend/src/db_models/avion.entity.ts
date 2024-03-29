import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avion {
  @PrimaryGeneratedColumn()
  id_avion: number;

  @Column()
  type: string;
}