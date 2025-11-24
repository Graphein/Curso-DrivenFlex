import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createTicket(eventId: number) {
  return prisma.ticket.create({ data: { eventId } });
}
