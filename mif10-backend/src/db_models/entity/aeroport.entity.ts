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

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;
}
