import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvionsService } from './avions.service';
import { AvionsController } from './avions.controller';
import { Avion } from './avion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avion])],
  providers: [AvionsService],
  controllers: [AvionsController],
})
export class AvionsModule {}