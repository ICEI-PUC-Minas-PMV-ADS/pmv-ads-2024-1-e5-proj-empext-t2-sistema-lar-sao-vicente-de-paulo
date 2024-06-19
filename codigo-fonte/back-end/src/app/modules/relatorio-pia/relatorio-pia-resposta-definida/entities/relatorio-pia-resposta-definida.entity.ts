import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RelatorioPiaRespostaDefinida as RelatorioPiaRespostaDefinidaModel } from '@prisma/client';

export class RelatorioPiaRespostaDefinida
	implements RelatorioPiaRespostaDefinidaModel
{
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiPropertyOptional()
	valor: string | null;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiPropertyOptional()
	uid_relatorio_pia_resposta_opcao: string | null;
}
