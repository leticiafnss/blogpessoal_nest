import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // type of database
      host: 'localhost', // host of database
      port: 3306, // port of database
      username: 'root', // username of database
      password: 'lf@gmail27', // password of database
      database: 'db_blogpessoal', // name of database
      entities: [Postagem],
      synchronize: true
    })


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
