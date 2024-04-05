import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aeroport } from '../entity/aeroport.entity';
import { CreateAeroportDto } from '../dto/create-aeroport-dto';
import { UpdateAeroportDto } from '../dto/update-aeroport-dto';


@Injectable()
export class AeroportsService {
  constructor(
    @InjectRepository(Aeroport)
    private aeroportsRepository: Repository<Aeroport>,
  ) {}

  async create(createAeroportDto: CreateAeroportDto): Promise<Aeroport> {
    const aeroportData =
      await this.aeroportsRepository.create(
        createAeroportDto,
      );
    return this.aeroportsRepository.save(aeroportData);
  }

  findAll(): Promise<Aeroport[]> {
    return this.aeroportsRepository.find();
  }

  findOne(iata: string): Promise<Aeroport | null> {
    return this.aeroportsRepository.findOneBy({ iata });
  }

  update(iata: string, updateAeroportDto: UpdateAeroportDto){
    return this.aeroportsRepository.update(iata, updateAeroportDto);
  }

  async remove(iata: string): Promise<void> {
    await this.aeroportsRepository.delete(iata);
  }
}