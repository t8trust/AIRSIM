import { utilisateursFindAllMock } from './utilisateurs.mock';

export class UtilisateursServiceMock {
  findAll = jest.fn().mockResolvedValue(utilisateursFindAllMock);
}
