import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaPerguntaDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	pergunta: string;

	@ApiProperty()
	@IsNotEmpty()
	id_relatorio_pia: bigint;
}
