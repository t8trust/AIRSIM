import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursController } from './db_models/controller/utilisateurs.controller';
import { UtilisateursService } from './db_models/service/utilisateurs.service';
import { Utilisateur } from './db_models/entity/utilisateur.entity';
import { getModelToken } from "nestjs-typegoose";

describe('UtilisateursController', () => {
  let userController: UtilisateursController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateursController],
      //providers: [UtilisateursService, { provide: getModelToken(Utilisateur), useValue: jest.fn() }],
    }).compile();

    userController = app.get<UtilisateursController>(UtilisateursController);
  });

  describe('findAll', () => {
    it('should return all users', () => {
      expect(userController.findAll()).toBe('oui');
    });
  });
});

