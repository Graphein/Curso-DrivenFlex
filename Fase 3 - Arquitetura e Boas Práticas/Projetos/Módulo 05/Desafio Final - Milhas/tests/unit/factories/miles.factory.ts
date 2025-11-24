import { faker } from '@faker-js/faker';
import { Trip, ServiceClass, AffiliateStatus } from '../../../src/protocols';

export function createTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    code: faker.string.alphanumeric(6),
    origin: { lat: faker.location.latitude(), long: faker.location.longitude() },
    destination: { lat: faker.location.latitude(), long: faker.location.longitude() },
    miles: false,
    plane: faker.airline.airplane().name,
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.BRONZE,
    date: faker.date.anytime().toISOString().split('T')[0],
    ...overrides,
  };
}