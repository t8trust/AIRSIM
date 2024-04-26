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
      await this.aeroportsRepository.create(createAeroportDto);
    return this.aeroportsRepository.save(aeroportData);
  }

  async findAll(search : string, page : number, limit : number, bounds : string): Promise<Aeroport[] | null> {
    
    const query = this.aeroportsRepository
    .createQueryBuilder("aeroport");

    if(search != null){
      search= search.toLowerCase()
      query.where("LOWER(aeroport.nom) like :NOM", { NOM:`${search}%` });
      query.orWhere("LOWER(aeroport.ville) like :VILLE", { VILLE:`${search}%` });
      query.orWhere("LOWER(aeroport.pays) like :PAYS", { PAYS:`${search}%` });
    }

    if(bounds != null){
      bounds = JSON.parse(bounds);
      
      if(bounds.length == 4){
        query.andWhere("aeroport.longitude >= :MINLONG", { MINLONG: bounds[0] })
        query.andWhere("aeroport.latitude >= :MINLAT", { MINLAT: bounds[1] })
        query.andWhere("aeroport.longitude <= :MAXLONG", { MAXLONG: bounds[2] })
        query.andWhere("aeroport.latitude <= :MAXLAT", { MAXLAT: bounds[3] })
      }
    }

    if(limit == null){ limit = 300; }
    else{ limit = Math.min(limit, 300)}

    if(page == null){ page = 0; }
    query.skip(page * limit)
    query.take(limit)

    return await query.getMany();
  }

  async findAllInArea(
    minlat: number,
    minlong: number,
    maxlat: number,
    maxlong: number,
  ): Promise<Aeroport[] | null> {
    const res = await this.aeroportsRepository
      .createQueryBuilder('aeroport')
      .where('aeroport.latitude >= :MINLAT', { MINLAT: minlat })
      .andWhere('aeroport.longitude >= :MINLONG', { MINLONG: minlong })
      .andWhere('aeroport.latitude <= :MAXLAT', { MAXLAT: maxlat })
      .andWhere('aeroport.longitude <= :MAXLONG', { MAXLONG: maxlong })
      .getMany();

    return res;
  }

  findOne(iata: string): Promise<Aeroport | null> {
    return this.aeroportsRepository.findOneBy({ iata });
  }

  update(iata: string, updateAeroportDto: UpdateAeroportDto) {
    return this.aeroportsRepository.update(iata, updateAeroportDto);
  }

  async remove(iata: string): Promise<void> {
    await this.aeroportsRepository.delete(iata);
  }
}
