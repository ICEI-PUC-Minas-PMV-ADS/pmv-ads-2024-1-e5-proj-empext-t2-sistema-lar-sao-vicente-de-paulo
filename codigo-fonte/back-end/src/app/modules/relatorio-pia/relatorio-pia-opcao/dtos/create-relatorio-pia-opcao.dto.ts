import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaOpcaoDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	opcao: string;

	@ApiProperty()
	@IsNotEmpty()
	id_relatorio_pia_resposta: bigint;
}
