import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Usuario as UsuarioModel } from "@prisma/client";

export class Usuario implements UsuarioModel {
  @ApiProperty({ description: "O ID do usuário" })
  id: bigint;

  @ApiProperty({ description: "O UID do usuário" })
  uid: string;

  @ApiProperty({ type: 'string', format: 'binary', description: "A foto do usuário" })
  foto: Buffer;

  @ApiProperty({ description: "O ID do cargo associado ao usuário, se houver" })
  cargo_id: bigint | null;

  @ApiProperty({ description: "O nome do usuário" })
  nome: string;

  @ApiProperty({ description: "O CPF ou CNH do usuário" })
  cpf_cnh: string;

  @ApiProperty({ description: "O e-mail do usuário" })
  email: string;

  @ApiProperty({ description: "A senha do usuário" })
  senha: string;

  @ApiProperty({ enum: ['ATIVO', 'INATIVO', 'PENDENTE'], description: "A situação do usuário" })
  situacao: $Enums.Situacao;

  @ApiProperty({ description: "Data de criação do usuário" })
  criado_em: Date;

  @ApiProperty({ description: "Data de atualização do usuário" })
  atualizado_em: Date;
}
