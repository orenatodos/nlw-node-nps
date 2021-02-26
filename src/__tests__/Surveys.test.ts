import { getConnection } from 'typeorm';

import request from 'supertest';
import app from '../app';

import createConnection from '../database/connection';

describe('Surveys', async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Deve ser capaz de criar uma nova pesquisa', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve ser capaz de listar todas as pesquisas', async () => {
    await request(app).post('/surveys').send({
      title: 'Title Example 2',
      description: 'Description Example 2',
    });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});
