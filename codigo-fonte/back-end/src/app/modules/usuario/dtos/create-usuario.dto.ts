import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
	@ApiProperty({ description: 'Nome do usuário' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome: string;

	@ApiPropertyOptional({ description: 'Foto do usuário' })
	@IsString()
	@IsOptional()
	foto?: string;

	@ApiProperty({ description: 'CPF ou CNH do usuário' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(11)
	cpf_cnh: string;

	@ApiProperty({ description: 'E-mail do usuário' })
	@IsNotEmpty()
	@MaxLength(254)
	@IsEmail({}, { message: 'E-mail no formato incorreto' })
	email: string;

	@ApiProperty({ description: 'Senha do usuário' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(60)
	senha: string;

	@ApiProperty({ description: 'Id do Cargo do usuário' })
	@IsNotEmpty()
	id_cargo: bigint;

	@ApiPropertyOptional({ description: 'Situação do usuário' })
	@IsString()
	@IsOptional()
	situacao?: $Enums.Situacao;
}
