import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Testes E2E - Usuário', () => {
  let app: INestApplication;
  let userId: number;
  let token: string;

  const usuarioBase = {
    nome: 'Usuário Teste',
    usuario: `teste${Date.now()}@email.com`,
    senha: '@Teste123',
    foto: 'https://i.imgur.com/foto.png',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('01 - Deve cadastrar usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios')
      .send(usuarioBase);

    console.log('CADASTRO STATUS:', res.statusCode);
    console.log('CADASTRO BODY:', res.body);

    userId = res.body.id;

    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toEqual(usuarioBase.nome);
    expect(res.body.usuario).toEqual(usuarioBase.usuario);
  });

  it('02 - Deve autenticar usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        usuario: usuarioBase.usuario,
        senha: usuarioBase.senha,
      });

    console.log('LOGIN STATUS:', res.statusCode);
    console.log('LOGIN BODY:', res.body);

    token = res.body.token;

    expect(res.statusCode).toEqual(201);
    expect(token).toBeDefined();
  });

  it('03 - Não deve cadastrar usuário duplicado', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios')
      .send(usuarioBase);

    console.log('DUPLICADO STATUS:', res.statusCode);
    console.log('DUPLICADO BODY:', res.body);

    expect(res.statusCode).toEqual(400);
  });

  it('04 - Deve listar usuários', async () => {
    const res = await request(app.getHttpServer())
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);

    console.log('LISTAR STATUS:', res.statusCode);
    console.log('LISTAR BODY:', res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('05 - Deve atualizar usuário', async () => {
    const res = await request(app.getHttpServer())
      .put('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: userId,
        nome: 'Usuário Atualizado',
        usuario: usuarioBase.usuario,
        senha: usuarioBase.senha,
        foto: 'https://i.imgur.com/foto-atualizada.png',
      });

    console.log('ATUALIZAR STATUS:', res.statusCode);
    console.log('ATUALIZAR BODY:', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toEqual('Usuário Atualizado');
  });

  afterAll(async () => {
    await app.close();
  });
});