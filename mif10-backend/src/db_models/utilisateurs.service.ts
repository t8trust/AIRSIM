import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private usersRepository: Repository<Utilisateur>,
  ) {}

  findAll(): Promise<Utilisateur[]> {
    return this.usersRepository.find();
  }

  findOne(login: string): Promise<Utilisateur | null> {
    return this.usersRepository.findOneBy({ login });
  }

  async remove(login: string): Promise<void> {
    await this.usersRepository.delete(login);
  }
}