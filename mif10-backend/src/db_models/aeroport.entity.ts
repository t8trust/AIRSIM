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

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
