
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilisateursModule as UsersModule } from '../db_models/module/utilisateurs.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get("jwt.secret"),
        signOptions: { expiresIn: '60s' },
      })
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

