import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryColumn('varchar')
  login: string;

  @Column()
  mot_de_passe: string;
  
  @Column()
  salt: string;
}
