import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UtilisateursService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  async create(@Req() request: Request) {
    console.log(request)
    //return await this.utilisateursService.create();
  }

  @Get()
  async findAll(@Req() request: Request) {
    return await this.utilisateursService.findAll();
  }
}