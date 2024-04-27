import { aeroportsMock, updatedAeroportsMock } from './aeroports.mock';

export class AeroportsServiceMock {
  create = jest.fn().mockResolvedValue(aeroportsMock);
  findAll = jest.fn().mockResolvedValue(aeroportsMock);
  update = jest.fn().mockResolvedValue(updatedAeroportsMock);
  remove = jest.fn().mockResolvedValue(aeroportsMock[1]);
}
