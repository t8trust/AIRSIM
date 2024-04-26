import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursController } from './db_models/controller/utilisateurs.controller';
import { UtilisateursService } from './db_models/service/utilisateurs.service';
import { UtilisateursServiceMock } from './db_models/mocks/utilisateurs.service.mock';
import { utilisateursFindAllMock } from './db_models/mocks/utilisateurs.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('UtilisateursController', () => {
  let controller: UtilisateursController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UtilisateursController],
      providers: [
        { provide: UtilisateursService, useClass: UtilisateursServiceMock },
        JwtService, // Add JwtService as a provider
        ConfigService, // Add ConfigService as a provider
      ],
      imports: [JwtModule], // Add JwtModule to the imports array
    }).compile();

    controller = module.get<UtilisateursController>(UtilisateursController);
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
      const a = utilisateursFindAllMock;
      expect(
        controller.findAll(),
      ).resolves.toEqual(a);
    });
  });
});
