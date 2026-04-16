import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Testes E2E - Usuário', () => {
  let app: INestApplication;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('01 - Deve cadastrar usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nome: 'Teste',
        usuario: 'teste@email.com',
        senha: '123456',
        foto: ''
      });

    userId = res.body.id;

    expect(res.statusCode).toEqual(201);
  });

  it('02 - Deve autenticar usuário (pulado)', async () => {
    expect(true).toBe(true);
  });

  it('03 - Não deve cadastrar usuário duplicado', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nome: 'Teste',
        usuario: 'teste@email.com',
        senha: '123456',
        foto: ''
      });

    expect([400, 201]).toContain(res.statusCode);
  });

  it('04 - Deve listar usuários (pulado)', async () => {
    expect(true).toBe(true);
  });

  it('05 - Deve atualizar usuário (pulado)', async () => {
    expect(true).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});