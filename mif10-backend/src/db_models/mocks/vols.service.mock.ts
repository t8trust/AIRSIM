import { volsMock, volsMockUpdated } from './vols.mock';

export class VolsServiceMock {
  create = jest.fn().mockResolvedValue(volsMock[0]);
  findOne = jest.fn().mockResolvedValue(volsMock[0]);
  update = jest.fn().mockResolvedValue(volsMockUpdated);
  remove = jest.fn().mockResolvedValue(volsMock[0]);
  findTravel = jest.fn().mockResolvedValue(volsMock);
}
