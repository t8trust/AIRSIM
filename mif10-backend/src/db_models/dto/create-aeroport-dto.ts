import { IsNotEmpty } from 'class-validator';

export class CreateAeroportDto {
  @IsNotEmpty()
  iata: string;

  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  pays: string;

  @IsNotEmpty()
  ville: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}