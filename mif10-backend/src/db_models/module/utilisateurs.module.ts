import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from '../entity/utilisateur.entity';
import { UtilisateursService } from '../service/utilisateurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  providers: [UtilisateursService],
  exports: [TypeOrmModule, UtilisateursService],
})
export class UtilisateursModule {}
