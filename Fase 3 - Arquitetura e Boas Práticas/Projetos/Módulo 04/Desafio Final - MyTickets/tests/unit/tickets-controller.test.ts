import express from 'express';
import request from 'supertest';

jest.mock('../../src/services/tickets-service');
import * as service from '../../src/services/tickets-service';

import ticketsRouter from '../../src/routers/tickets-router';
import errorHandlerMiddleware from '../../src/middlewares/error-middleware';

function appWithTickets() {
  const app = express();
  app.use(express.json());
  app.use(ticketsRouter);          // monta o router que tem essas rotas
  app.use(errorHandlerMiddleware); // mantém o handler
  return app;
}

describe('tickets-controller (unit)', () => {
  afterEach(() => jest.resetAllMocks());

  it('PUT /tickets/use/:id -> 200/204 quando service resolve', async () => {
    (service.useTicket as jest.Mock).mockResolvedValue({ id: 7, used: true });

    const app = appWithTickets();
    const res = await request(app).put('/tickets/use/7'); // ⚠️ PUT, não POST

    expect([200, 204]).toContain(res.status);
  });

  it('GET /tickets/:eventId -> 200 quando service resolve', async () => {
    (service.getAllTickets as jest.Mock).mockResolvedValue([]);

    const app = appWithTickets();
    const res = await request(app).get('/tickets/1'); // ⚠️ /tickets/:eventId

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
