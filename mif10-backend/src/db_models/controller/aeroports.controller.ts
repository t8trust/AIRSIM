import { Controller, Get, Post, Req, Param, Delete, Put, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AeroportsService } from '../service/aeroports.service';
import { CreateAeroportDto } from '../dto/create-aeroport-dto';
import { UpdateAeroportDto } from '../dto/update-aeroport-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('aeroports')
export class AeroportsController {
  constructor(private readonly aeroportsService: AeroportsService) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Get(':iata/:page')
  async findAllPagination(@Param('iata') iata: string, @Param('page') page: number) {
    return await this.aeroportsService.findAllPage(iata, page);
  }

  @Get(':minlat/:minlong/:maxlat/:maxlong')
  async findAllArea(@Param('minlat') minlat: number, 
  @Param('minlong') minlong: number,
  @Param('maxlat') maxlat: number,
  @Param('maxlong') maxlong: number,) {
    return await this.aeroportsService.findAllInArea(minlat, minlong, maxlat, maxlong);
  }

  @Put(':iata')
  @UseGuards(AuthGuard)
  async update(@Param('iata') iata: string, @Body() updateAeroportDto: UpdateAeroportDto) {
    return await this.aeroportsService.update(iata, updateAeroportDto);
  }

  @Delete(':iata')
  @UseGuards(AuthGuard)
  remove(@Param('iata') iata: string) {
    return this.aeroportsService.remove(iata);
  }
}