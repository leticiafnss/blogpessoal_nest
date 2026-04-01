import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagem"})
export class Postagem{

@PrimaryGeneratedColumn() // Cria uma chave primaria e auto increment 
id!: number;

@IsNotEmpty() // Verifica se o campo esta vazio
@Column({length: 100, nullable: false}) // Cria uma coluna chamada titulo, com 100 caracteres e nao ser nulo. 
titulo!: string;

@IsNotEmpty()
@Column({length: 1000, nullable: false})
texto!: string;

@UpdateDateColumn() // Cria uma coluna chamada data atualizacao da postagem 
data!: Date;

}