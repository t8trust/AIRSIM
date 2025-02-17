import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AeroportsService } from '../service/aeroports.service';
import { CreateAeroportDto } from '../dto/create-aeroport-dto';
import { UpdateAeroportDto } from '../dto/update-aeroport-dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('aeroports')
export class AeroportsController {
  constructor(private readonly aeroportsService: AeroportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() request: Request) {
    const body = request.body;
    const dto = new CreateAeroportDto();
    dto.iata = body.iata;
    dto.nom = body.nom;
    dto.pays = body.pays;
    dto.ville = body.ville;
    dto.latitude = body.latitude;
    dto.longitude = body.longitude;

    return await this.aeroportsService.create(dto);
  }

  // search = name, country or city
  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('bounds') bounds: string,
  ) {
    return await this.aeroportsService.findAll(search, page, limit, bounds);
  }

  @Get(':iata')
  async findOne(@Param('iata') iata: string) {
    return await this.aeroportsService.findOne(iata);
  }

  @Put(':iata')
  @UseGuards(AuthGuard)
  async update(
    @Param('iata') iata: string,
    @Body() updateAeroportDto: UpdateAeroportDto,
  ) {
    return await this.aeroportsService.update(iata, updateAeroportDto);
  }

  @Delete(':iata')
  @UseGuards(AuthGuard)
  remove(@Param('iata') iata: string) {
    return this.aeroportsService.remove(iata);
  }
}
