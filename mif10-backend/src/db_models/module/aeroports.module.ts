
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeroport } from '../entity/aeroport.entity';
import { AeroportsService } from '../service/aeroports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aeroport])],
  providers: [AeroportsService],
  exports: [TypeOrmModule, AeroportsService]
})
export class AeroportsModule {}
