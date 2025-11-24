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

describe('Events', () => {
  it('GET /events -> 200 lista (pode ser vazia)', async () => {
    const res = await request(app).get('/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /events -> 200 com múltiplos', async () => {
    await createEvent({ name: 'A' });
    await createEvent({ name: 'B' });
    const res = await request(app).get('/events');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /events/:id -> 200 quando existe', async () => {
    const ev = await createEvent({ name: 'Meu Evento' });
    const res = await request(app).get(`/events/${ev.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: ev.id, name: 'Meu Evento' });
  });

  it('GET /events/:id -> 400 quando id inválido (abc)', async () => {
    const res = await request(app).get('/events/abc');
    expect(res.status).toBe(400);
  });

  it('GET /events/:id -> 400 quando id = 0', async () => {
    const res = await request(app).get('/events/0');
    expect(res.status).toBe(400);
  });

  it('GET /events/:id -> 404 quando não existe', async () => {
    const res = await request(app).get('/events/999999');
    expect(res.status).toBe(404);
  });

  it('GET /events -> 200 com múltiplos registros', async () => {
    await createEvent({ name: 'Alpha' });
    await createEvent({ name: 'Beta' });
    const res = await request(app).get('/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /events/:id -> 404 quando id é float', async () => {
    const res = await request(app).get('/events/1.5');
    expect(res.status).toBe(404);
  });

  it('GET /events/:id -> 400 quando id é negativo', async () => {
    const res = await request(app).get('/events/-1');
    expect(res.status).toBe(400);
  });

  it('GET /events/:id -> 404 com id muito grande inexistente', async () => {
    const res = await request(app).get('/events/9999999');
    expect(res.status).toBe(404);
  });

  it('GET /events -> 200 e itens com shape esperado', async () => {
    await createEvent({ name: 'ShapeTest' });
    const res = await request(app).get('/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const item = res.body[0];
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          date: expect.any(String), 
        }),
      );

      const d = new Date(item.date);
      expect(Number.isNaN(+d)).toBe(false);
    }
  });
  it('POST /events -> 409 quando nome já existe', async () => {
    const ev = await createEvent({ name: 'Duplicado' });
    const res = await request(app).post('/events').send({
      name: ev.name,
      date: faker.date.future(),
    });
    expect([409, 400, 422]).toContain(res.status);
  });

  it('GET /events/:id -> 404 quando não existe', async () => {
    const res = await request(app).get('/events/1');
    expect(res.status).toBe(404);
  });
  it('POST /events -> 201 cria evento', async () => {
    const res = await request(app).post('/events').send({
      name: 'Novo Evento',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    expect([201, 200]).toContain(res.status);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Novo Evento',
      })
    );
  });
  
  it('POST /events -> 409 quando name já existe', async () => {
    const dup = 'Duplicado-CTRL';
    await request(app).post('/events').send({
      name: dup,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  
    const res = await request(app).post('/events').send({
      name: dup,
      date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    });
    expect([409, 400, 422]).toContain(res.status);
  });
  
  it('PUT /events/:id -> 200 atualiza quando válido', async () => {
    const create = await request(app).post('/events').send({
      name: 'E-Update',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    const id = create.body.id as number;
  
    const res = await request(app).put(`/events/${id}`).send({
      name: 'E-Update-OK',
      date: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    });
  
    expect([200, 204]).toContain(res.status);
  });
  
  it('PUT /events/:id -> 409 ao tentar trocar para nome já usado', async () => {
    // cria A e B
    const a = await request(app).post('/events').send({
      name: 'E-A',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    const b = await request(app).post('/events').send({
      name: 'E-B',
      date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    });
    const idB = b.body.id as number;
  
    // tenta renomear B para "E-A"
    const res = await request(app).put(`/events/${idB}`).send({
      name: 'E-A',
      date: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    });
  
    expect([409, 400, 422]).toContain(res.status);
  });
  
  it('DELETE /events/:id -> 204/200 quando existe', async () => {
    const created = await request(app).post('/events').send({
      name: 'E-Del',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    const id = created.body.id as number;
  
    const res = await request(app).delete(`/events/${id}`);
    expect([204, 200]).toContain(res.status);
  });
  
  it('DELETE /events/:id -> 404 quando não existe', async () => {
    const res = await request(app).delete('/events/99999999');
    expect(res.status).toBe(404);
  });
});
