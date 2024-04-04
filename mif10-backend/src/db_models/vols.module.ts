
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vol } from './vol.entity';
import { VolsService } from './vols.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vol])],
  providers: [VolsService],
  exports: [TypeOrmModule, VolsService]
})
export class VolsModule {}
