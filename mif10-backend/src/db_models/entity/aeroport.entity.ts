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

  @Column({ type: 'float', default: 0 })
  latitude: number;

  @Column({ type: 'float', default: 0 })
  longitude: number;
}
