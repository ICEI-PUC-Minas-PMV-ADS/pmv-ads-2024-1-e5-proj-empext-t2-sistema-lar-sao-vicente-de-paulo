import { ApiProperty } from '@nestjs/swagger';
import { GrupoPermissao as GrupoPermissaoModel } from '@prisma/client';

export class GrupoPermissao implements GrupoPermissaoModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	nome: string;

	@ApiProperty()
	codigo: number;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;
}
