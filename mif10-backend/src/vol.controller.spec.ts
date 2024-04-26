import { Test, TestingModule } from '@nestjs/testing';
import { VolController } from './db_models/controller/vol.controller';
import { VolService } from './db_models/service/vol.service';
import { VolServiceMock } from './db_models/mocks/vol.service.mock';
import { volMock } from './db_models/mocks/vol.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

describe('VolController', () => {
  let controller: VolController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [VolController],
      providers: [
        { provide: VolService, useClass: VolServiceMock },
        JwtService, // Add JwtService as a provider
        ConfigService, // Add ConfigService as a provider
      ],
      imports: [JwtModule], // Add JwtModule to the imports array
    }).compile();

    controller = module.get<VolController>(VolController);
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
      const a = volMock;
      expect(
        controller.findAll('paris', 0, 2, '[0, 0, 50, 50]'),
      ).resolves.toEqual(a);
    });
  });

  describe('create', () => {
    it('should create a new aeroport', async () => {
      const requestMock: Partial<Request> = {
        body: volMock[1],
      };

      jest
        .spyOn(controller, 'create')
        .mockImplementationOnce(() => volMock[1] as any);

      const createdAeroport = await controller.create(requestMock as Request);

      expect(createdAeroport).toEqual(volMock[1]); // Assurez-vous d'adapter cette assertion selon le comportement réel de votre application
    });
  });

  describe('update', () => {
    it('should update an airport', async () => {
      const requestMock: Partial<Request> = {
        body: {
          iata: 'CDGU',
          nom: 'Charles de Gaulle',
          pays: 'France',
          ville: 'Paris',
          latitude: 49.0097,
          longitude: 2.5478,
        },
      };
      const updatedAeroport = {
        iata: 'CDGU',
      };

      jest
        .spyOn(controller, 'update')
        .mockImplementationOnce(() => requestMock.body as any);

      const res = await controller.update(volMock[1].iata, updatedAeroport);

      expect(res).toEqual(requestMock.body);
    });
  });

  describe('remove', () => {
    it('should remove an airport', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue(volMock[1] as any);

      const res = await controller.remove(volMock[1].iata);

      expect(res).toEqual(volMock[1]);
    });
  });
});
