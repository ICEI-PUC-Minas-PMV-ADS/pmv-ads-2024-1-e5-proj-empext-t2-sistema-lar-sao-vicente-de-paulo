import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaRespostaDefinidaDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@MaxLength(255)
	valor: string | null;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	uid_relatorio_pia_resposta_opcao: string | null;
}
