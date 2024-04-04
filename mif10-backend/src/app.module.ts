import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { Utilisateur } from './db_models/utilisateur.entity';
import { UtilisateursController } from './db_models/utilisateurs.controller';
import { UtilisateursService } from './db_models/utilisateurs.service';
import { UtilisateursModule } from './db_models/utilisateurs.module';
import { AuthModule } from './auth/auth.module';

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
        entities: [Utilisateur],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    UtilisateursModule,
    AuthModule
  ],
  controllers: [AppController, UtilisateursController],
  providers: [AppService, UtilisateursService],
})

export class AppModule {}
