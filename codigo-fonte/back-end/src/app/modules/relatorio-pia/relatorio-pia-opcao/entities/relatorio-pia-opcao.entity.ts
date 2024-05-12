import { ApiProperty } from '@nestjs/swagger';
import { RelatorioPiaRespostaOpcao as RelatorioPiaOpcaoModel } from '@prisma/client';

export class RelatorioPiaRespostaOpcao implements RelatorioPiaOpcaoModel {
	@ApiProperty()
	uid: string;

	@ApiProperty()
	opcao: string;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	id_relatorio_pia_resposta: bigint;
}
