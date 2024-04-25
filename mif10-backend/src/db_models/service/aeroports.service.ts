import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
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

  async findAllWithName(name : string, page : number, limit : number): Promise<Aeroport[] | null> {

    return await this.aeroportsRepository
      .createQueryBuilder("aeroport")
      .where("aeroport.nom like :NOM", { NOM:`${name}%` })
      .skip(page * limit)
      .take(limit)
      .getMany();
  }


  async findAllWithoutName(page : number, limit : number): Promise<Aeroport[] | null> {

    return await this.aeroportsRepository
      .createQueryBuilder("aeroport")
      .skip(page * limit)
      .take(limit)
      .getMany();
  }

  async findAllInArea(minlat: number, minlong: number, maxlat: number, maxlong: number): Promise<Aeroport[] | null> {

    const res = await this.aeroportsRepository
      .createQueryBuilder("aeroport")
      .where("aeroport.latitude >= :MINLAT", { MINLAT: minlat })
      .andWhere("aeroport.longitude >= :MINLONG", { MINLONG: minlong })
      .andWhere("aeroport.latitude <= :MAXLAT", { MAXLAT: maxlat })
      .andWhere("aeroport.longitude <= :MAXLONG", { MAXLONG: maxlong })
      .getMany();

    return res;
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