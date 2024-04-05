import { Controller, Get, Post, Req, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { AeroportsService } from './aeroports.service';
import { CreateAeroportDto } from './dto/create-aeroport-dto';
import { UpdateAeroportDto } from './dto/update-aeroport-dto';

@Controller('aeroports')
export class AeroportsController {
  constructor(private readonly aeroportsService: AeroportsService) {}

  @Post()
  async create(@Req() request: Request) {
    let body = request.body
    let dto = new CreateAeroportDto();
    dto.iata = body.iata
    dto.nom = body.nom
    dto.pays = body.pays
    dto.ville = body.ville
    dto.latitude = body.latitude
    dto.longitude = body.longitude

    return await this.aeroportsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.aeroportsService.findAll();
  }

  @Get(':iata')
  async findOne(@Param('iata') iata: string) {
    return await this.aeroportsService.findOne(iata);
  }

  @Put(':iata')
  async update(@Param('iata') iata: string, @Body() updateAeroportDto: UpdateAeroportDto) {
    return await this.aeroportsService.update(iata, updateAeroportDto);
  }

  @Delete(':iata')
  remove(@Param('iata') iata: string) {
    return this.aeroportsService.remove(iata);
  }
}