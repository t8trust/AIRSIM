import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService as UsersService } from '../db_models/service/utilisateurs.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Request as ERequest } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  getFullPassString(pass: string, salt: string) {
    const pepper = this.config.get<string>('pwd.pepper');
    return pepper + pass + salt;
  }

  hashPassword(pass: string, salt: string) {
    return argon2.hash(this.getFullPassString(pass, salt));
  }

  verify(hashed_pwd, password, salt) {
    return argon2.verify(hashed_pwd, this.getFullPassString(password, salt));
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (await this.verify(user?.mot_de_passe, pass, user.salt)) {
      throw new UnauthorizedException();
    }
    return this.makePayload(user.login);
  }

  async makePayload(login) {
    const payload = { sub: login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  extractTokenFromHeader(request: ERequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getTokenInfoFromReq(request: ERequest) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const jwt = type === 'Bearer' ? token : undefined;

    if (!jwt) return {};

    return this.jwtService.decode(jwt);
  }
}
