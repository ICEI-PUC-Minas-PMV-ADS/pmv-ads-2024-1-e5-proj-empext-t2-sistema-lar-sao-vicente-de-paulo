import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Cargo as CargoModel } from '@prisma/client';

export class Cargo implements CargoModel {
	@ApiProperty()
	id: bigint;

	@ApiProperty()
	uid: string;

	@ApiProperty()
	nome: string;

	@ApiProperty({
		enum: ['ATIVO', 'INATIVO'],
		description: 'A situação do cargo',
	})
	situacao: $Enums.Situacao;

	@ApiProperty()
	criado_em: Date;

	@ApiProperty()
	atualizado_em: Date;
}
