import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaRespostaDefinidaDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	valor: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	uid_relatorio_pia_resposta_opcao: string;
}
