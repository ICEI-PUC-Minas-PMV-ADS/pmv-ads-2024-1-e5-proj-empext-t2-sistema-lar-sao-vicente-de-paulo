import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum UsuarioSituacao {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
}

export class CreateUsuarioDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    cpf_cnh: string;

    @ApiProperty()
    @IsEmail({}, { message: 'E-mail no formato incorreto' })
    email: string;

    @ApiProperty()
    @IsString()
    senha: string;

    @ApiPropertyOptional({
        enum: UsuarioSituacao,
    })
    @IsOptional()
    @IsEnum(UsuarioSituacao)
    situacao?: UsuarioSituacao;
}
