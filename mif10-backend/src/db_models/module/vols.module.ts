
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vol } from '../entity/vol.entity';
import { VolsService } from '../service/vols.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vol])],
  providers: [VolsService],
  exports: [TypeOrmModule, VolsService]
})
export class VolsModule {}
