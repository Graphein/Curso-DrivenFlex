import * as repo from '../../../src/repositories/miles-repository';
import * as calc from '../../../src/services/miles-calculator-service';
import { generateMilesForTrip, getMilesFromCode } from '../../../src/services/miles-service';
import { createTrip } from '../factories/miles.factory';

jest.mock('../../../src/repositories/miles-repository');
jest.mock('../../../src/services/miles-calculator-service');

describe('Miles Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateMilesForTrip', () => {
    it('should throw conflict error if miles already exist', async () => {
      const trip = createTrip();
      (repo.findMiles as jest.Mock).mockResolvedValue({ code: trip.code, miles: 1000 });
      await expect(generateMilesForTrip(trip)).rejects.toMatchObject({ type: 'conflict' });
    });

    it('should save and return calculated miles if not existing', async () => {
      const trip = createTrip();
      (repo.findMiles as jest.Mock).mockResolvedValue(null);
      (calc.calculateMiles as jest.Mock).mockReturnValue(500);
      (repo.saveMiles as jest.Mock).mockResolvedValue({ code: trip.code, miles: 500 });

      const result = await generateMilesForTrip(trip);
      expect(calc.calculateMiles).toHaveBeenCalledWith(trip);
      expect(repo.saveMiles).toHaveBeenCalledWith(trip.code, 500);
      expect(result).toBe(500);
    });
  });

  describe('getMilesFromCode', () => {
    it('should return miles if found', async () => {
      (repo.findMiles as jest.Mock).mockResolvedValue({ code: 'ABC123', miles: 300 });
      const result = await getMilesFromCode('ABC123');
      expect(result.miles).toBe(300);
    });

    it('should throw not_found if no miles found', async () => {
      (repo.findMiles as jest.Mock).mockResolvedValue(null);
      await expect(getMilesFromCode('ZZZ999')).rejects.toMatchObject({ type: 'not_found' });
    });
  });
});
