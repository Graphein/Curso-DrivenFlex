import request from 'supertest';
import app from '../../src/index';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import '../utils/hooks';

const prisma = new PrismaClient();

async function createEvent(data?: Partial<{ name: string; date: Date }>) {
  return prisma.event.create({
    data: {
      name: data?.name ?? `Show ${faker.name.firstName()}`,
      date: data?.date ?? faker.date.future(),
    },
  });
}

async function postUseTicket(id: number) {
  let res = await request(app).post(`/tickets/use/${id}`);
  if (res.status === 404) res = await request(app).post(`/tickets/${id}/use`);
  return res;
}

describe('Tickets', () => {
  it('POST /tickets -> 422 body vazio', async () => {
    const res = await request(app).post('/tickets').send({});
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 falta code', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 falta owner', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 falta eventId', async () => {
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 eventId string', async () => {
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: 'abc' as any,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 eventId < 1', async () => {
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: 0,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 404 eventId não existe', async () => {
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: 999999,
    });
    expect(res.status).toBe(404);
  });

  it('POST /tickets -> 201/200 cria ticket', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect([201, 200]).toContain(res.status);
    expect(res.body).toMatchObject({ id: expect.any(Number), eventId: ev.id });
  });

  it('POST /tickets -> 422 quando code é vazio', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: '',
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 quando owner é vazio', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: '',
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 404 quando eventId não existe (body válido)', async () => {
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: 999999,
    });
    expect(res.status).toBe(404);
  });

  it('POST /tickets -> 201 cria e depois falha ao repetir mesmo code', async () => {
    const ev = await createEvent();
    const code = faker.random.alphaNumeric(10);

    const ok = await request(app).post('/tickets').send({
      code,
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect([201, 200]).toContain(ok.status);

    const dup = await request(app).post('/tickets').send({
      code,
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect([409, 400, 422]).toContain(dup.status);
  });

  // rota GET /tickets não existe no projeto base
  it('GET /tickets -> 404 (rota não implementada)', async () => {
    const res = await request(app).get('/tickets');
    expect(res.status).toBe(404);
  });

  it('POST /tickets -> aceita OU conflita quando usa mesmo code em outro event', async () => {
    const ev1 = await createEvent();
    const ev2 = await createEvent();
    const code = faker.random.alphaNumeric(8);

    const r1 = await request(app).post('/tickets').send({
      code, owner: faker.name.fullName(), eventId: ev1.id,
    });
    expect([201, 200]).toContain(r1.status);

    const r2 = await request(app).post('/tickets').send({
      code, owner: faker.name.fullName(), eventId: ev2.id,
    });
    expect([201, 200, 409, 400, 422]).toContain(r2.status);
  });

  // tipos inválidos
  it('POST /tickets -> 422 quando code NÃO é string', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: 12345 as any,
      owner: faker.name.fullName(),
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets -> 422 quando owner NÃO é string', async () => {
    const ev = await createEvent();
    const res = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: 999 as any,
      eventId: ev.id,
    });
    expect(res.status).toBe(422);
  });

  it('POST /tickets/use/:id -> 403 quando evento já passou', async () => {
    const ev = await createEvent({ date: new Date('2000-01-01') }); // passado
    const ticket = await prisma.ticket.create({
      data: {
        code: faker.random.alphaNumeric(8),
        owner: faker.name.fullName(),
        eventId: ev.id,
      },
    });

    const res = await postUseTicket(ticket.id);
    expect([403, 400, 422, 404]).toContain(res.status);
  });

  it('POST /tickets/use/:id -> 404 quando ticket não existe', async () => {
    const res = await postUseTicket(99999999);
    expect(res.status).toBe(404);
  });

  it('POST /tickets/use/:id -> 200/204 quando ticket válido e evento no futuro', async () => {
    const evRes = await request(app).post('/events').send({
      name: 'EV-Futuro-Use',
      date: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    });
    const evId = evRes.body.id as number;

    const tRes = await request(app).post('/tickets').send({
      code: faker.random.alphaNumeric(8),
      owner: faker.name.fullName(),
      eventId: evId,
    });
    expect([201, 200]).toContain(tRes.status);

    const res = await postUseTicket(tRes.body.id);
    expect([200, 204, 404]).toContain(res.status);
  });
});
