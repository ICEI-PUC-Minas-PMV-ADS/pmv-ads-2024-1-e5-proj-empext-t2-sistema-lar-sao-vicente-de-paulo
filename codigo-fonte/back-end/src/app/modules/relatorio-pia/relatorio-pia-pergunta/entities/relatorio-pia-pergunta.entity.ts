import { ApiProperty } from '@nestjs/swagger';
import { RelatorioPiaPergunta as RelatorioPiaPerguntaModel } from '@prisma/client';

export class RelatorioPiaPergunta implements RelatorioPiaPerguntaModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	pergunta: string;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	id_relatorio_pia: bigint;
}
