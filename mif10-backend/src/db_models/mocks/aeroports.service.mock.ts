import { aeroportsMock } from './aeroports.mock';

export class AeroportsServiceMock {
  create = jest.fn().mockRejectedValue(aeroportsMock[0]);
  findAll = jest.fn().mockResolvedValue(aeroportsMock);
  update = jest.fn();
  remove = jest.fn();
}
