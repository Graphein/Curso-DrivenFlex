import { PrismaClient } from '@prisma/client';
import {
  saveEvent,
  findAllEvents,
  findEventById,
  findEventByName,
  updateEvent,
  deleteEvent,
} from '../../src/repositories/events-repository';

const prisma = new PrismaClient();

describe('events-repository', () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
    await prisma.$disconnect();
  });

  it('saveEvent / findEventById / findAllEvents', async () => {
    const created = await saveEvent({ name: 'Repo-Event-1', date: new Date() });
    expect(created.id).toBeGreaterThan(0);

    const found = await findEventById(created.id);
    expect(found?.id).toBe(created.id);

    const all = await findAllEvents();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  it('findEventByName', async () => {
    const name = 'Unique-By-Name';
    await saveEvent({ name, date: new Date() });

    const byName = await findEventByName(name);
    expect(byName?.name).toBe(name);
  });

  it('updateEvent', async () => {
    const ev = await saveEvent({ name: 'To-Update', date: new Date() });
    const newDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const updated = await updateEvent({ name: 'Updated-Name', date: newDate }, ev.id);
    expect(updated.name).toBe('Updated-Name');

    const check = await findEventById(ev.id);
    expect(check?.name).toBe('Updated-Name');
  });

  it('deleteEvent', async () => {
    const ev = await saveEvent({ name: 'To-Delete', date: new Date() });
    await deleteEvent(ev.id);

    const gone = await findEventById(ev.id);
    expect(gone).toBeNull();
  });
});
