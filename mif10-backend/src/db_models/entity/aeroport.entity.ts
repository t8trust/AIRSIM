import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Aeroport {
  @PrimaryColumn('varchar')
  iata: string;

  @Column()
  nom: string;

  @Column()
  pays: string;

  @Column()
  ville: string;

  @Column('decimal', { precision: 6, scale: 2 })
  latitude: number;

  @Column('decimal', { precision: 6, scale: 2 })
  longitude: number;
}
