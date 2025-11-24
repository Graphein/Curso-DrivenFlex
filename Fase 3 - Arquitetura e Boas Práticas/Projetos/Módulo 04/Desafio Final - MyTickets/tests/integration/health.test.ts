import request from 'supertest';
import app from '../../src/index';
import '../utils/hooks';

const api = () => request(app);

describe('Health', () => {
  it("GET /health -> 200 e responde 'I'm okay!'", async () => {
    const res = await api().get('/health');

    expect(res.status).toBe(200);
    expect(res.text).toBe("I'm okay!");
  });
});
