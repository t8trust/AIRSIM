import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService as UsersService } from '../db_models/service/utilisateurs.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}


  getFullPassString(pass: string, salt: string){
    const pepper = this.config.get<string>("pwd.pepper");
    return pepper + pass + salt
  }

  hashPassword(pass: string, salt: string){
    return argon2.hash(this.getFullPassString(pass, salt));
  }

  verify(hashed_pwd, password, salt){
    return argon2.verify(hashed_pwd, this.getFullPassString(password, salt))
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    console.log(await this.hashPassword(pass, user.salt))
    console.log(user?.mot_de_passe)
    if (await this.verify(user?.mot_de_passe, pass, user.salt)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

