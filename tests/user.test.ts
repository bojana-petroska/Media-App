import app from '../src/index.js';
import request from 'supertest';
import { AppDataSource } from '../src/config/database.js';
import { faker } from '@faker-js/faker';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('User tests', () => {
  const randomUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    userName: faker.person.fullName(),
  };
  it('should register a user', async () => {
    const res = await request(app).post('/api/users/register').send(randomUser);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });
});
