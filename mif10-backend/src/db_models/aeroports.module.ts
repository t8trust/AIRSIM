
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeroport } from './aeroport.entity';
import { AeroportsService } from './aeroports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aeroport])],
  providers: [AeroportsService],
  exports: [TypeOrmModule, AeroportsService]
})
export class AeroportsModule {}
