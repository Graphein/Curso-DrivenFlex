import express from 'express';
import request from 'supertest';
import errorHandlerMiddleware from '../../src/middlewares/error-middleware';

function makeApp(setup: (app: express.Express) => void) {
  const app = express();
  app.use(express.json());
  setup(app);
  app.use(errorHandlerMiddleware);
  return app;
}

describe('error-middleware', () => {
  it('mapeia not_found -> 404', async () => {
    const app = makeApp(app => {
      app.get('/err', (_req, _res, next) =>
        next({ type: 'not_found', message: 'x' })
      );
    });
    const res = await request(app).get('/err');
    expect(res.status).toBe(404);
  });

  it('mapeia bad_request -> 400', async () => {
    const app = makeApp(app => {
      app.get('/err', (_req, _res, next) =>
        next({ type: 'bad_request', message: 'x' })
      );
    });
    const res = await request(app).get('/err');
    expect(res.status).toBe(400);
  });

  it('mapeia conflict -> 409', async () => {
    const app = makeApp(app => {
      app.get('/err', (_req, _res, next) =>
        next({ type: 'conflict', message: 'x' })
      );
    });
    const res = await request(app).get('/err');
    expect(res.status).toBe(409);
  });

  it('mapeia forbidden -> 403', async () => {
    const app = makeApp(app => {
      app.get('/err', (_req, _res, next) =>
        next({ type: 'forbidden', message: 'x' })
      );
    });
    const res = await request(app).get('/err');
    expect(res.status).toBe(403);
  });

  it('caminho padrão -> 500 quando erro não mapeado', async () => {
    const app = makeApp(app => {
      app.get('/boom', () => {
        throw new Error('unexpected');
      });
    });
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
  });
});
