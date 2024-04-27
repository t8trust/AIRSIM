import { utilisateursCreateMock, utilisateursUnauthorized, utilisateursFindOneMock } from './utilisateurs.mock';

export class UtilisateursServiceMock {
  findAll = jest.fn().mockResolvedValue(utilisateursUnauthorized);
  findOne = jest.fn().mockResolvedValue(utilisateursFindOneMock);
  create = jest.fn().mockResolvedValue(utilisateursCreateMock);
  delete = jest.fn().mockResolvedValue(utilisateursUnauthorized);
  update = jest.fn().mockResolvedValue(utilisateursUnauthorized);
}
