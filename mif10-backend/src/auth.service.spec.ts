import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthServiceMock } from './db_models/mocks/auth.service.mock';
// import { } from './db_models/mocks/auth.mock';

import { AuthGuard } from './auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';

describe('AuthService', () => {
  let controller: AuthController;
  let service: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        AuthGuard,
      ],
      imports: [JwtModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const pass = 'admin';
      const salt = '123456789';
      expect(service.hashPassword(pass, salt)).resolves.toEqual(
        'admin_mdp',
      );
    });
  });

  //   describe('findAll', () => {
  //     it('should return all the users (not authorized)', () => {
  //       expect(controller.findAll()).resolves.toEqual(utilisateursUnauthorized);
  //     });
  //   });

  //   describe('findOne', () => {
  //     it('should return one user', () => {
  //       const a = utilisateursFindOneMock;
  //       expect(controller.findOne('tests@test.com')).resolves.toEqual(a);
  //     });
  //   });

  //   describe('create', () => {
  //     it('should create a new user', async () => {
  //       const requestMock: Partial<Request> = {
  //         body: {
  //           login: 'admin',
  //           mot_de_passe: 'admin_mdp',
  //           salt: '123456789',
  //         },
  //       };

  //       expect(controller.create(requestMock as Request)).resolves.toEqual(
  //         utilisateursCreateMock,
  //       );
  //     });
  //   });

  //   describe('update', () => {
  //     it('should update a user', async () => {
  //       const requestMock: Partial<Request> = {
  //         body: utilisateursUnauthorized,
  //       };
  //       expect(
  //         controller.update(
  //           requestMock as Request,
  //           'admin',
  //           new UpdateUtilisateurDto(),
  //         ),
  //       ).resolves.toEqual(utilisateursUnauthorized);
  //     });
  //   });

  //   describe('delete', () => {
  //     it('should delete a user', async () => {
  //       expect(controller.remove('admin')).resolves.toEqual(
  //         utilisateursCreateMock,
  //       );
  //     });
  //   });
});
