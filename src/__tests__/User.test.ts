import { getConnection } from 'typeorm';

import request from 'supertest';
import app from '../app';

import createConnection from '../database/connection';

describe('Users', async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Deve ser capaz de criar um novo usuário', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um usuário com e-mail existente', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    });

    expect(response.status).toBe(400);
  });
});
