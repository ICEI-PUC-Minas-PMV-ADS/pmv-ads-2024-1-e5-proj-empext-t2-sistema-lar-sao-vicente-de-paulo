import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUsuarioDto {
    @ApiPropertyOptional({ description: "Nome do usuário" })
    @IsString()
    nome: string;

    @ApiPropertyOptional({ description: "CPF ou CNH do usuário" })
    @IsString()
    cpf_cnh: string;

    @ApiPropertyOptional({ description: "E-mail do usuário" })
    @IsEmail({}, { message: 'E-mail no formato incorreto' })
    email: string;
}
