import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Controller("/postagens")
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/titulo/:titulo")
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param("titulo") titulo: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(titulo);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}