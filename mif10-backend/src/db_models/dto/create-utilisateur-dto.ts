import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUtilisateurDto {
  @IsEmail()
  login: string;

  @IsNotEmpty()
  mot_de_passe: string;

  @IsNotEmpty()
  salt: string;
}
