import { aeroportsMock } from './aeroports.mock';

export class AeroportsServiceMock {
  create = jest.fn();
  findAll = jest.fn().mockResolvedValue(aeroportsMock);
  update = jest.fn();
  remove = jest.fn();
}
