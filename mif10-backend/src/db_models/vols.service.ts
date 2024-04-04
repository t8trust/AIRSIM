import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vol } from './vol.entity';
import { CreateVolDto } from './dto/create-vol-dto';
import { UpdateVolDto } from './dto/update-vol-dto';


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

  findAll(): Promise<Vol[]> {
    return this.volsRepository.find();
  }

  findOne(id_vol: number): Promise<Vol | null> {
    return this.volsRepository.findOneBy({ id_vol });
  }

  update(id_vol: number, updateVolDto: UpdateVolDto){
    return this.volsRepository.update(id_vol, updateVolDto);
  }

  async remove(id_vol: number): Promise<void> {
    await this.volsRepository.delete(id_vol);
  }
}