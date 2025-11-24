import { PrismaClient } from '@prisma/client';
import {
  saveTicket,
  findAllEventTickets,
  findTicketById,
  findTicketByCodeForEvent,
  updateTicketUse,
} from '../../src/repositories/tickets-repository';

const prisma = new PrismaClient();

async function makeEvent(name = 'Repo-Ticket-Evt') {
  return prisma.event.create({ data: { name, date: new Date(Date.now() + 48 * 60 * 60 * 1000) } });
}

describe('tickets-repository', () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
    await prisma.$disconnect();
  });

  it('saveTicket / findTicketById', async () => {
    const ev = await makeEvent();
    const t = await saveTicket({ code: 'ABC12345', owner: 'Repo User', eventId: ev.id });

    const found = await findTicketById(t.id);
    expect(found?.id).toBe(t.id);
    expect(found?.Event?.id).toBe(ev.id);
  });

  it('findAllEventTickets', async () => {
    const ev = await makeEvent('Repo-List');
    await saveTicket({ code: 'L1', owner: 'A', eventId: ev.id });
    await saveTicket({ code: 'L2', owner: 'B', eventId: ev.id });

    const list = await findAllEventTickets(ev.id);
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(2);
  });

  it('findTicketByCodeForEvent', async () => {
    const ev = await makeEvent('Repo-Find-Code');
    const code = 'CODE-XYZ';
    await saveTicket({ code, owner: 'X', eventId: ev.id });

    const byCode = await findTicketByCodeForEvent(ev.id, code);
    expect(byCode?.code).toBe(code);
  });

  it('updateTicketUse', async () => {
    const ev = await makeEvent('Repo-Use');
    const t = await saveTicket({ code: 'USE-ME', owner: 'Y', eventId: ev.id });

    const used = await updateTicketUse(t.id);
    expect(used.used).toBe(true);

    const check = await findTicketById(t.id);
    expect(check?.used).toBe(true);
  });
});
