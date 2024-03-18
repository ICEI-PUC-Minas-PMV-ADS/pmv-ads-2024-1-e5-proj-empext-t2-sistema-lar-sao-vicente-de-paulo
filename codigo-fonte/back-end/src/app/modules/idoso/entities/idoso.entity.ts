import { ApiProperty } from "@nestjs/swagger";
import { Idoso as IdosoModel } from "@prisma/client";

export class Idoso implements IdosoModel {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    usuario_id: bigint;

    @ApiProperty()
    foto: Buffer;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    data_nascimento: Date;

    @ApiProperty()
    data_admissao: Date;

    @ApiProperty()
    cpf_cnh: string;

    @ApiProperty()
    nome_pai: string;

    @ApiProperty()
    nome_mae: string;

    @ApiProperty()
    responsavel: string;

    @ApiProperty()
    telefone_responsavel: string;

    @ApiProperty()
    genero: string;

    @ApiProperty()
    leito: string;

    @ApiProperty()
    situacao: string;

    @ApiProperty()
    motivo_inativacao: string;

    @ApiProperty()
    criado_em: Date;

    @ApiProperty()
    atualizado_em: Date;
}