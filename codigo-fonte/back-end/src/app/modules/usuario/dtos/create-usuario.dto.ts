import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @ApiProperty({ description: "Nome do usuário" })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ description: "CPF ou CNH do usuário" })
    @IsNotEmpty()
    @IsString()
    cpf_cnh: string;

    @ApiProperty({ description: "E-mail do usuário" })
    @IsNotEmpty()
    @IsEmail({}, { message: 'E-mail no formato incorreto' })
    email: string;

    @ApiProperty({ description: "Senha do usuário" })
    @IsNotEmpty()
    @IsString()
    senha: string;
}
