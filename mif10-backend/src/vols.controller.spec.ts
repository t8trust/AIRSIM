import { Test, TestingModule } from '@nestjs/testing';
import { VolsController } from './db_models/controller/vols.controller';
import { VolsService } from './db_models/service/vols.service';
import { VolsServiceMock } from './db_models/mocks/vols.service.mock';
import { volsMock, volsMockUpdated } from './db_models/mocks/vols.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

describe('VolsController', () => {
  let controller: VolsController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [VolsController],
      providers: [
        { provide: VolsService, useClass: VolsServiceMock },
        JwtService, // Add JwtService as a provider
        ConfigService, // Add ConfigService as a provider
      ],
      imports: [JwtModule], // Add JwtModule to the imports array
    }).compile();

    controller = module.get<VolsController>(VolsController);
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return one aeroport', () => {
      expect(controller.findOne('MNL', 'BOG', 0)).resolves.toEqual(volsMock);
    });
  });

  describe('create', () => {
    it('should create a new aeroport', async () => {
      const requestMock: Partial<Request> = {
        body: volsMock[0],
      };

      expect(controller.create(requestMock as Request)).resolves.toEqual(
        volsMock[0],
      );
    });
  });

  describe('update', () => {
    it('should update a flight', async () => {
      const updatedFlight = {
        depart: 'BOGU',
      };

      expect(
        controller.update(volsMock[1].id_vol, updatedFlight),
      ).resolves.toEqual(volsMockUpdated);
    });
  });

  describe('remove', () => {
    it('should remove a flight', async () => {
      expect(controller.remove(323369)).resolves.toEqual(volsMock[0]);
    });
  });
});
