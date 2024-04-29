import { Controller, Get, Post, Req, Param, Query, Delete, Put, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { VolsService } from '../service/vols.service';
import { CreateVolDto } from '../dto/create-vol-dto';
import { UpdateVolDto } from '../dto/update-vol-dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('vols')
export class VolsController {
  constructor(private readonly volsService: VolsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() request: Request) {
    let body = request.body
    
    let createVolDto = new CreateVolDto();
    createVolDto.depart = body.depart;
    createVolDto.destination = body.destination;
    createVolDto.heure_depart = body.heure_depart;
    createVolDto.heure_destination = body.heure_destination;
    createVolDto.co2_average = body.co2_average;
    createVolDto.co2_emissions = body.co2_emissions;
    createVolDto.duree = body.duree;
    createVolDto.avion_id = body.avion_id;
    
    return await this.volsService.create(createVolDto);
  }

  @Get()
  async findAll(@Query('depart') depart: string, @Query('destination')destination: string, @Query('page') page: number, @Query("search") search: string) {
    if (depart && destination){
      return await this.volsService.findTravel(depart, destination, page);
    }

    return await this.volsService.findAll(0, search);
  }

  @Put(':id_vol')
  @UseGuards(AuthGuard)
  async update(@Param('id_vol') id_vol: number, @Body() updateVolDto: UpdateVolDto) {
    return await this.volsService.update(id_vol, updateVolDto);
  }

  @Delete(':id_vol')
  @UseGuards(AuthGuard)
  remove(@Param('id_vol') id_vol: number) {
    return this.volsService.remove(id_vol);
  }
}