import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avion } from './avion.entity';

@Injectable()
export class AvionsService {
  constructor(
    @InjectRepository(Avion)
    private avionsRepository: Repository<Avion>,
  ) {}

  findAll(): Promise<Avion[]> {
    return this.avionsRepository.find();
  }

  findOne(id_avion: number): Promise<Avion | null> {
    return this.avionsRepository.findOneBy({ id_avion });
  }

  async remove(id_avion: number): Promise<void> {
    await this.avionsRepository.delete(id_avion);
  }
}