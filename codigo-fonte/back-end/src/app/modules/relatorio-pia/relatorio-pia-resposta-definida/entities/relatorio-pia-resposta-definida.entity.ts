import { ApiProperty } from '@nestjs/swagger';
import { RelatorioPiaRespostaDefinida as RelatorioPiaDefRelatorioPiaRespostaDefinidaModel } from '@prisma/client';

export class RelatorioPiaRespostaDefinida
	implements RelatorioPiaDefRelatorioPiaRespostaDefinidaModel
{
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	valor: string;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	uid_relatorio_pia_resposta_opcao: string;
}
