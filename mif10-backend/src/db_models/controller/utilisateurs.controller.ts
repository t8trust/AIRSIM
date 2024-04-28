import { Controller, Get, Post, Req, Param, Delete, Put, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UtilisateursService } from '../service/utilisateurs.service';
import { CreateUtilisateurDto } from '../dto/create-utilisateur-dto';
import { UpdateUtilisateurDto } from '../dto/update-utilisateur-dto';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { randomBytes } from 'crypto';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(
    private readonly utilisateursService: UtilisateursService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async create(@Req() request: Request) {
    let body = request.body

    let createUserDto = new CreateUtilisateurDto();
    const salt = randomBytes(10).toString("hex");
    createUserDto.login = body.login;
    createUserDto.salt = salt;
    createUserDto.mot_de_passe = await this.authService.hashPassword(body.mot_de_passe, salt);

    await this.utilisateursService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.utilisateursService.findAll();
  }

  @Get(':login')
  async findOne(@Param('login') login: string) {
    return await this.utilisateursService.findOne(login);
  }

  @Put(':login')
  @UseGuards(AuthGuard)
  async update(@Param('login') login: string, @Body() updateUserDto: UpdateUtilisateurDto) {
    console.log(login, updateUserDto)
    return await this.utilisateursService.update(login, updateUserDto);
  }

  @Delete(':login')
  @UseGuards(AuthGuard)
  remove(@Param('login') login: string) {
    return this.utilisateursService.remove(login);
  }
}