import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { User } from './db_models/user.entity';
import { UsersController } from './db_models/users.controller';
import { UsersService } from './db_models/users.service';
import { UsersModule } from './db_models/users.module';

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
        entities: [User],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})

export class AppModule {}
