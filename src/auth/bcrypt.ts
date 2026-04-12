import * as bcrypt from 'bcrypt';

export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(senha, salt);
  }

  async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}