
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avion } from './avion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avion])],
  exports: [TypeOrmModule]
})
export class AvionsModule {}