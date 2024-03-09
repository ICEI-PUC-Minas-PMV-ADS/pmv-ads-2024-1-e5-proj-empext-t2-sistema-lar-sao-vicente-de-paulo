import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

enum UsuarioSituacao {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
}

export class CreateUsuarioDto {
    @ApiProperty()
    @IsString()
    primeiro_nome: string;

    @ApiProperty()
    @IsString()
    nome_completo: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_admin?: boolean;

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

    @ApiProperty()
    @IsPhoneNumber('BR', {
        message: 'Telefone no formato incorreto',
    })
    telefone: string;
}
