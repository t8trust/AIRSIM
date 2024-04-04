import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur-dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur-dto';


@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateursRepository: Repository<Utilisateur>,
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const userData =
      await this.utilisateursRepository.create(
        createUtilisateurDto,
      );
    return this.utilisateursRepository.save(userData);
  }

  findAll(): Promise<Utilisateur[]> {
    return this.utilisateursRepository.find();
  }

  findOne(login: string): Promise<Utilisateur | null> {
    return this.utilisateursRepository.findOneBy({ login });
  }

  update(login: string, updateUtilisateurDto: UpdateUtilisateurDto){
    return this.utilisateursRepository.update(login, updateUtilisateurDto);
  }

  async remove(login: string): Promise<void> {
    await this.utilisateursRepository.delete(login);
  }
}