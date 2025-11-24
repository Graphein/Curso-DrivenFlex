import { resetDatabase, disconnect } from './reset-db';

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await resetDatabase();
  await disconnect();
});
