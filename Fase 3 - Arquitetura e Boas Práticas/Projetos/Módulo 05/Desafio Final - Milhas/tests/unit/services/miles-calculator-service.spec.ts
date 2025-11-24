import { calculateMiles } from '../../../src/services/miles-calculator-service';
import { Trip, ServiceClass, AffiliateStatus } from '../../../src/protocols';

describe('Miles Calculator Service', () => {
  const baseTrip: Trip = {
    code: 'ABC123',
    origin: { lat: 0, long: 0 },
    destination: { lat: 0, long: 1 },
    miles: false,
    plane: 'Boeing',
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.BRONZE,
    date: '2024-05-10'
  };

  it('should calculate miles correctly for economic class without bonuses', () => {
    const miles = calculateMiles(baseTrip);
    expect(miles).toBeGreaterThan(0);
  });

  it('should apply service class multiplier', () => {
    const execTrip = { ...baseTrip, service: ServiceClass.FIRST_CLASS };
    const miles = calculateMiles(execTrip);
    expect(miles).toBeGreaterThan(calculateMiles(baseTrip));
  });

  it('should apply affiliate bonus for GOLD', () => {
    const goldTrip = { ...baseTrip, affiliate: AffiliateStatus.GOLD };
    const miles = calculateMiles(goldTrip);
    expect(miles).toBeGreaterThan(calculateMiles(baseTrip));
  });

  it('should apply birthday bonus if date is in May', () => {
    const mayTrip = { ...baseTrip, date: '2024-05-05' };
    const miles = calculateMiles(mayTrip);
    expect(miles).toBeGreaterThanOrEqual(calculateMiles(baseTrip));
  });
  
  it('should return 0 if trip was paid with miles', () => {
    const paidTrip = { ...baseTrip, miles: true };
    const miles = calculateMiles(paidTrip);
    expect(miles).toBe(0);
  });

  it('should not calculate distance or bonuses when using miles', () => {
    const trip = { ...baseTrip, miles: true };
    const miles = calculateMiles(trip);
    expect(miles).toBe(0);
  });
  it('should return rounded miles value', () => {
    const trip = { ...baseTrip };
    const miles = calculateMiles(trip);
    expect(Number.isInteger(miles)).toBe(true);
  });
  
});
