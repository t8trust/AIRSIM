import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService as UsersService } from '../db_models/service/utilisateurs.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.mot_de_passe !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

