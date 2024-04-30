import { Test, TestingModule } from '@nestjs/testing';
import { AeroportsController } from './db_models/controller/aeroports.controller';
import { AeroportsService } from './db_models/service/aeroports.service';
import { AeroportsServiceMock } from './db_models/mocks/aeroports.service.mock';
import {
  aeroportsMock,
  updatedAeroportsMock,
} from './db_models/mocks/aeroports.mock';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';

describe('AeroportsController', () => {
  let controller: AeroportsController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AeroportsController],
      providers: [
        { provide: AeroportsService, useClass: AeroportsServiceMock },
        { provide: AuthService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        AuthGuard,
      ],
      imports: [JwtModule],
    }).compile();

    controller = module.get<AeroportsController>(AeroportsController);
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all the aeroport', () => {
      const a = aeroportsMock;
      expect(
        controller.findAll('paris', 0, 2, '[0, 0, 50, 50]'),
      ).resolves.toEqual(a);
    });
  });

  describe('create', () => {
    it('should create a new aeroport', async () => {
      const requestMock: Partial<Request> = {
        body: aeroportsMock[1],
      };

      expect(controller.create(requestMock as Request)).resolves.toEqual(
        aeroportsMock,
      );
    });
  });

  describe('update', () => {
    it('should update an airport', async () => {
      const updatedAeroport = {
        iata: 'CDGU',
      };

      expect(
        controller.update(aeroportsMock[1].iata, updatedAeroport),
      ).resolves.toEqual(updatedAeroportsMock);
    });
  });

  describe('remove', () => {
    it('should remove an airport', async () => {
      expect(controller.remove(aeroportsMock[1].iata)).resolves.toEqual(
        aeroportsMock[1],
      );
    });
  });
});
