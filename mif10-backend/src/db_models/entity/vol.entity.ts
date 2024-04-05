import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Vol {
  @PrimaryColumn('int')
  id_vol: number;

  @Column()
  depart: string;

  @Column()
  destination: string;

  @Column()
  heure_depart: string;

  @Column()
  heure_destination: string;

  @Column()
  co2_average: number;

  @Column()
  co2_emissions: number;

  @Column()
  duree: number;

  @Column()
  avion_id: number;
}
