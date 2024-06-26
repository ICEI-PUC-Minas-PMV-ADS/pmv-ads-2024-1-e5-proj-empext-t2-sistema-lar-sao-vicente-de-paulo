import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome: string;

	@ApiProperty()
	@IsNotEmpty()
	id_modelo_relatorio_pia: bigint;

	@ApiProperty()
	@IsNotEmpty()
	id_usuario: bigint;

	@ApiProperty()
	@IsNotEmpty()
	id_idoso: bigint;

	@ApiProperty()
	@IsDateString()
	data_vencimento: Date;
}
