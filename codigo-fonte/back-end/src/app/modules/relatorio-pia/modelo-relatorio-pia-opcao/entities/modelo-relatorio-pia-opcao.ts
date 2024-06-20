import { ApiProperty } from '@nestjs/swagger';
import { ModeloRelatorioPiaRespostaOpcao as ModeloRelatorioPiaRespostaOpcaoModel } from '@prisma/client';

export class ModeloRelatorioPiaRespostaOpcao
	implements ModeloRelatorioPiaRespostaOpcaoModel
{
	@ApiProperty()
	uid: string;

	@ApiProperty()
	opcao: string;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	id_modelo_relatorio_pia_resposta: bigint;
}
