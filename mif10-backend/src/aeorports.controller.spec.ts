import { Test, TestingModule } from '@nestjs/testing';
import { AeroportsController } from './db_models/controller/aeroports.controller';
import { AeroportsService } from './db_models/service/aeroports.service';
import { AeroportsServiceMock } from './db_models/mocks/aeroports.service.mock';
import { aeroportsMock } from './db_models/mocks/aeroports.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AeroportsController', () => {
  let controller: AeroportsController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AeroportsController],
      providers: [
        { provide: AeroportsService, useClass: AeroportsServiceMock },
        JwtService, // Add JwtService as a provider
        ConfigService, // Add ConfigService as a provider
      ],
      imports: [JwtModule], // Add JwtModule to the imports array
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
      expect(controller.findAll()).resolves.toEqual(a);
    });
  });

  /*describe('create', () => {
    it('should create a new aeroport', async () => {
      const requestMock: Partial<Request> = {
        body: {
          iata: 'CDG',
          nom: 'Charles de Gaulle',
          pays: 'France',
          ville: 'Paris',
          latitude: 49.0097,
          longitude: 2.5478,
        },
      };

      const createdAeroport = await controller.create(requestMock as Request);

      expect(createdAeroport).toEqual(aeroportsMock); // Assurez-vous d'adapter cette assertion selon le comportement réel de votre application
    });
  });*/
});
