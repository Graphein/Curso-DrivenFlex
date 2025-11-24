import * as repo from '../../../src/repositories/miles-repository';

export function mockRepository() {
  return {
    findMiles: jest.spyOn(repo, 'findMiles'),
    saveMiles: jest.spyOn(repo, 'saveMiles'),
  };
}
