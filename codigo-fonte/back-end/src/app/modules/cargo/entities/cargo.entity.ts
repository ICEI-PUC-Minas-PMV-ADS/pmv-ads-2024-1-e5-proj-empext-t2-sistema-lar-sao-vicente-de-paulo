import { ApiProperty } from '@nestjs/swagger';
import { Cargo as CargoModel } from '@prisma/client';

export class Cargo implements CargoModel {
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
}
