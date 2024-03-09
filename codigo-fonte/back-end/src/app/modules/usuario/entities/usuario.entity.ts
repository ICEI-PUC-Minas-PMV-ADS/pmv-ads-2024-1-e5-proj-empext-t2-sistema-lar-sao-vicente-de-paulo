import { ApiProperty } from '@nestjs/swagger';
import { Usuario as UsuarioModel } from '@prisma/client';

export class Usuario implements UsuarioModel {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    is_admin: boolean;

    @ApiProperty()
    primeiro_nome: string;

    @ApiProperty()
    nome_completo: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    senha: string;

    @ApiProperty()
    telefone: string;

    @ApiProperty()
    situacao: string;
}
