import { Controller, Get, Post, Req, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { VolsService } from './vols.service';
import { CreateVolDto } from './dto/create-vol-dto';
import { UpdateVolDto } from './dto/update-vol-dto';

@Controller('vols')
export class VolsController {
  constructor(private readonly volsService: VolsService) {}

  @Post()
  async create(@Req() request: Request) {
    let body = request.body
    let createVolDto = new CreateVolDto();
    return await this.volsService.create(createVolDto);
  }

  @Get(':depart/:destination')
  async findOne(@Param('depart') depart: string, @Param('destination')destination: string) {
    return await this.volsService.findTravels(depart, destination);
  }

  @Put(':id_vol')
  async update(@Param('id_vol') id_vol: number, @Body() updateVolDto: UpdateVolDto) {
    console.log(id_vol, updateVolDto)
    return await this.volsService.update(id_vol, updateVolDto);
  }

  @Delete(':id_vol')
  remove(@Param('id_vol') id_vol: number) {
    return this.volsService.remove(id_vol);
  }
}