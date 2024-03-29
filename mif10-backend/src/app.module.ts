import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { Avion } from './db_models/avion.entity';
import { AvionsController } from './db_models/avions.controller';
import { AvionsService } from './db_models/avions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        entities: [Avion],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
  ],
  controllers: [AppController, AvionsController],
  providers: [AppService, AvionsService],
})

export class AppModule {}
