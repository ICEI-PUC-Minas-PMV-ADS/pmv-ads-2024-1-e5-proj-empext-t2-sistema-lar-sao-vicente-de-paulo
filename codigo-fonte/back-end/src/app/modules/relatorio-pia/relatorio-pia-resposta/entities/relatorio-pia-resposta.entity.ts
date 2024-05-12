import { ApiProperty } from '@nestjs/swagger';
import {
	$Enums,
	RelatorioPiaResposta as RelatorioPiaRespostaModel,
} from '@prisma/client';

export class RelatorioPiaResposta implements RelatorioPiaRespostaModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	titulo: string;

	@ApiProperty()
	tipo: $Enums.tiposReposta;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	id_relatorio_pia_pergunta: bigint;
}
