import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(login: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ login });
  }

  async remove(login: string): Promise<void> {
    await this.usersRepository.delete(login);
  }
}