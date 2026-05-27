import * as dotenv from 'dotenv'
dotenv.config()

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Postagem } from './postagem/entities/postagem.entity'
import { Tema } from './tema/entities/tema.entity'
import { Usuario } from './usuario/entities/usuario.entity'

import { PostagemModule } from './postagem/postagem.module'
import { TemaModule } from './tema/tema.module'
import { UsuarioModule } from './usuario/usuario.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL,
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
    }),

    PostagemModule,
    TemaModule,
    UsuarioModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})

export class AppModule {}