import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Bcrypt } from './bcrypt';
import { UsuarioLogin } from './usuario.login';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async validateUser(usuario: string, senha: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(usuario);

    if (!buscaUsuario) {
      return null;
    }

    const senhaValida = await this.bcrypt.compararSenhas(
      senha,
      buscaUsuario.senha,
    );

    if (senhaValida) {
      const { senha, ...resultado } = buscaUsuario;
      return resultado;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}