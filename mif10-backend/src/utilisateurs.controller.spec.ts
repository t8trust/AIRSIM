import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursController } from './db_models/controller/utilisateurs.controller';
import { UtilisateursService } from './db_models/service/utilisateurs.service';
import { UtilisateursServiceMock } from './db_models/mocks/utilisateurs.service.mock';
import { AuthServiceMock } from './db_models/mocks/auth.service.mock';
import {
  utilisateursFindOneMock,
  utilisateursCreateMock,
  utilisateursUnauthorized,
} from './db_models/mocks/utilisateurs.mock';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';
import { UpdateUtilisateurDto } from './db_models/dto/update-utilisateur-dto';

describe('UtilisateursController', () => {
  let controller: UtilisateursController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UtilisateursController],
      providers: [
        { provide: UtilisateursService, useClass: UtilisateursServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        AuthGuard,
      ],
      imports: [JwtModule],
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
    it('should return all the users (not authorized)', () => {
      expect(controller.findAll()).resolves.toEqual(utilisateursUnauthorized);
    });
  });

  describe('findOne', () => {
    it('should return one user', () => {
      const a = utilisateursFindOneMock;
      expect(controller.findOne('tests@test.com')).resolves.toEqual(a);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const requestMock: Partial<Request> = {
        body: {
          login: 'admin',
          mot_de_passe: 'admin_mdp',
          salt: '123456789',
        },
      };

      expect(controller.create(requestMock as Request)).resolves.toEqual(
        utilisateursCreateMock,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const requestMock: Partial<Request> = {
        body: utilisateursUnauthorized,
      };
      expect(
        controller.update(
          requestMock as Request,
          'admin',
          new UpdateUtilisateurDto(),
        ),
      ).resolves.toEqual(utilisateursUnauthorized);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      expect(controller.remove('admin')).resolves.toEqual(
        utilisateursCreateMock,
      );
    });
  });
});
