import { Controller, Get, Post, Req, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { UtilisateursService } from '../service/utilisateurs.service';
import { CreateUtilisateurDto } from '../dto/create-utilisateur-dto';
import { UpdateUtilisateurDto } from '../dto/update-utilisateur-dto';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  async create(@Req() request: Request) {
    let body = request.body

    let createUserDto = new CreateUtilisateurDto();
    createUserDto.login = body.login;
    createUserDto.mot_de_passe = body.mot_de_passe;
    createUserDto.salt = body.salt;

    return await this.utilisateursService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.utilisateursService.findAll();
  }

  @Get(':login')
  async findOne(@Param('login') login: string) {
    return await this.utilisateursService.findOne(login);
  }

  @Put(':login')
  async update(@Param('login') login: string, @Body() updateUserDto: UpdateUtilisateurDto) {
    console.log(login, updateUserDto)
    return await this.utilisateursService.update(login, updateUserDto);
  }

  @Delete(':login')
  remove(@Param('login') login: string) {
    return this.utilisateursService.remove(login);
  }
}