import { ApiProperty } from '@nestjs/swagger';
import { Permissao as PermissaoModel } from '@prisma/client';

export class Permissao implements PermissaoModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	nome: string;

	@ApiProperty()
	codigo: number;

	@ApiProperty()
	id_grupo_permissao: bigint;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;
}
