import { calculateDistance, toRadius, applyHaversineFormula } from '../../../src/services/distances-calculator-service';

describe('Distances Calculator Service', () => {
  it('should convert degrees to radians correctly', () => {
    expect(toRadius(180)).toBeCloseTo(Math.PI);
  });

  it('should calculate distance in KM correctly between São Paulo and Rio de Janeiro', () => {
    const sp = { lat: -23.5505, long: -46.6333 };
    const rj = { lat: -22.9068, long: -43.1729 };

    const distance = calculateDistance(sp, rj);
    expect(distance).toBeGreaterThan(300);
    expect(distance).toBeLessThan(500);
  });

  it('should return distance in miles when isMiles=true', () => {
    const a = { lat: 0, long: 0 };
    const b = { lat: 0, long: 1 };
    const km = calculateDistance(a, b);
    const mi = calculateDistance(a, b, true);
    expect(mi).toBeLessThan(km);
  });
});
