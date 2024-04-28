/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vol } from '../entity/vol.entity';
import { CreateVolDto } from '../dto/create-vol-dto';
import { UpdateVolDto } from '../dto/update-vol-dto';
import { Aeroport } from '../entity/aeroport.entity';

@Injectable()
export class VolsService {
  constructor(
    @InjectRepository(Vol)
    private volsRepository: Repository<Vol>,
  ) {}

  async create(createVolDto: CreateVolDto): Promise<Vol> {
    const volData =
      await this.volsRepository.create(
        createVolDto,
      );
    return this.volsRepository.save(volData);
  }


  async findTravel(depart: string, destination: string, page: number): Promise<Vol[] | null> {

    if(page == null)
      page = 0

    const res = await this.volsRepository
      .createQueryBuilder("vol")
      .where("vol.depart = :dep", { dep: depart })
      .andWhere("vol.destination = :dest", { dest: destination })
      .orderBy("vol.co2_emissions")
      .skip(page * 10)
      .take(10)
      .getMany();

      return res;
  }

  async findAll(page: number, search?: string): Promise<Vol[] | null> {

    if(page == null)
      page = 0

    const res = await this.volsRepository
      .createQueryBuilder("vol")

    if (search){
      res.leftJoin("aeroport", "a", "depart = a.iata")
        .leftJoin("aeroport", "b", "destination = b.iata")
        .where("a.nom like :nom", { nom: `${search}%` })
        .orWhere("a.ville like :nom", { nom: `${search}%` })
        .orWhere("a.pays like :nom", { nom: `${search}%` })
        .orWhere("b.nom like :nom", { nom: `${search}%` })
        .orWhere("b.ville like :nom", { nom: `${search}%` })
        .orWhere("b.pays like :nom", { nom: `${search}%` })
    }

    return res.orderBy("vol.co2_emissions")
    .skip(page * 10)
    .take(10)
    .getMany();
  }

  update(id_vol: number, updateVolDto: UpdateVolDto){
    return this.volsRepository.update(id_vol, updateVolDto);
  }

  async remove(id_vol: number): Promise<void> {
    await this.volsRepository.delete(id_vol);
  }
}