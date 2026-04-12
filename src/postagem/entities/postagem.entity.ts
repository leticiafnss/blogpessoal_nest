import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  titulo!: string;

  @Column({ length: 1000, nullable: false })
  texto!: string;

  @ManyToOne(() => Tema, (tema) => tema.postagem)
  tema!: Tema;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem)
  usuario!: Usuario;
}