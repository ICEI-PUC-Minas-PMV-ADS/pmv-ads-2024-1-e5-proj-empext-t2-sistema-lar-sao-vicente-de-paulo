import { ApiProperty } from '@nestjs/swagger';
import { RelatorioPia as ModeloRelatorioPiaModel } from '@prisma/client';

export class RelatorioPia implements ModeloRelatorioPiaModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	nome: string;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;

	@ApiProperty()
	id_modelo_relatorio_pia: bigint;

	@ApiProperty()
	id_usuario: bigint;

	@ApiProperty()
	id_idoso: bigint;
}
