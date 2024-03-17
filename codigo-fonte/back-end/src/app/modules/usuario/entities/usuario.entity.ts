import { ApiProperty } from "@nestjs/swagger";
import { Usuario as UsuarioModel } from "@prisma/client";

export class Usuario implements UsuarioModel {
    @ApiProperty()
      id: bigint;

    @ApiProperty()
      uid: string;

    @ApiProperty()
      foto: Buffer;

    @ApiProperty()
      cargo_id: bigint | null;

    @ApiProperty()
      nome: string;

    @ApiProperty()
      cpf_cnh: string;

    @ApiProperty()
      email: string;

    @ApiProperty()
      senha: string;

    @ApiProperty()
      situacao: string;

    @ApiProperty()
      criado_em: Date;

    @ApiProperty()
      atualizado_em: Date;
}
