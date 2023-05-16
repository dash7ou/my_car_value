import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handle a signup request', async () => {
    const email = 'tesxxt@teste2e.co';
    const password = '1020258ddd';

    const { status, body } = await request(app.getHttpServer())
      .post('/auth/singup')
      .send({ email, password });

    expect(status).toBe(201);

    const { email: emailRes, id } = body;
    expect(id).toBeDefined();
    expect(emailRes).toBe(email);
  });
});
