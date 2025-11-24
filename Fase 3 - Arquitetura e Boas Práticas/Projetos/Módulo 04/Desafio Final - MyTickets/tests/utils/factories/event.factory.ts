// tests/utils/factories/event.factory.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

type CreateEventParams = Partial<{ name: string; date: Date }>;

export async function createEvent(params: CreateEventParams = {}) {
  return prisma.event.create({
    data: {
      name: params.name ?? `Show ${faker.name.firstName()}`,
      date: params.date ?? faker.date.future(),
    },
  });
}
