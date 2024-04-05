import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { Utilisateur } from './db_models/entity/utilisateur.entity';
import { Vol } from './db_models/entity/vol.entity';
import { Aeroport } from './db_models/entity/aeroport.entity';
import { UtilisateursController } from './db_models/controller/utilisateurs.controller';
import { UtilisateursService } from './db_models/service/utilisateurs.service';
import { UtilisateursModule } from './db_models/module/utilisateurs.module';
import { AuthModule } from './auth/auth.module';
import { VolsModule } from './db_models/module/vols.module';
import { VolsController } from './db_models/controller/vols.controller';
import { VolsService } from './db_models/service/vols.service';
import { AeroportsModule } from './db_models/module/aeroports.module';
import { AeroportsController } from './db_models/controller/aeroports.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        entities: [Utilisateur, Vol, Aeroport],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    UtilisateursModule,
    VolsModule,
    AeroportsModule,
    AuthModule
  ],
  controllers: [AppController, UtilisateursController, VolsController, AeroportsController],
  providers: [AppService, UtilisateursService, VolsService, AeroportsModule, JwtService],
})

export class AppModule {}
