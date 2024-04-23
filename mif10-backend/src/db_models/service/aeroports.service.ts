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

  async findAll(): Promise<Aeroport[] | null> {
    return this.aeroportsRepository.find();
  }

  async findAllPage(iata: string, page: number): Promise<Aeroport[] | null> {
    iata = iata.toUpperCase();

    const res = await this.aeroportsRepository
      .createQueryBuilder("aeroport")
      .where("aeroport.iata like :IATA", { IATA:`${iata}%` })
      .skip(page * 10)
      .take(10)
      .getMany();

    return res;
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