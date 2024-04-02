import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UtilisateursService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Get()
  async findAll(@Req() request: Request) {
    let result = await this.utilisateursService.findAll();
    return result;
  }
}