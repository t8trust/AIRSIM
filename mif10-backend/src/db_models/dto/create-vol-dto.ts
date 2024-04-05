import { IsNumber, IsString } from 'class-validator';

export class CreateVolDto {
  @IsNumber()
  id_vol: number;

  @IsString()
  depart: string;

  @IsString()
  destination: string;

  @IsString()
  heure_depart: string;

  @IsString()
  heure_destination: string;

  @IsNumber()
  co2_average: number;

  @IsNumber()
  co2_emissions: number;

  @IsNumber()
  duree: number;

  @IsNumber()
  avion_id: number;
}