import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class UpdateUsuarioDto {
    @ApiPropertyOptional({ description: "Nome do usuário" })
    @IsString()
    @MaxLength(255)
    nome: string;

    @ApiPropertyOptional({ description: "CPF ou CNH do usuário" })
    @IsString()
    @MaxLength(11)
    cpf_cnh: string;

    @ApiPropertyOptional({ description: "E-mail do usuário" })
    @IsEmail({}, { message: 'E-mail no formato incorreto' })
    @MaxLength(254)
    email: string;
}
