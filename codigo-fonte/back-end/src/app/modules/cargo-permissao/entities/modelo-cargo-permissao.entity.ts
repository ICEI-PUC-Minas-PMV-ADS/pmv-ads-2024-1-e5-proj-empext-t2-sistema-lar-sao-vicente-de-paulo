import { ApiProperty } from '@nestjs/swagger';
import { CargoPermissao as CargoPermissaoModel } from '@prisma/client';

export class CargoPermissao implements CargoPermissaoModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	ativo: boolean;

	@ApiProperty()
	id_cargo: bigint;

	@ApiProperty()
	id_permissao: bigint;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;
}
