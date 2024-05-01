import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponsavelIdoso as ResponsavelIdosoModel } from '@prisma/client';

export class ResponsavelIdoso implements ResponsavelIdosoModel {
	@ApiProperty({ description: 'ID do responsável do idoso' })
	id: bigint;

	@ApiProperty({ description: 'UID do responsável do idoso' })
	uid: string;

	@ApiProperty({ description: 'Parentesco do responsável do idoso' })
	parentesco: string;

	@ApiProperty({ description: 'Nome do responsável do idoso' })
	nome_completo: string;

	@ApiProperty({ description: 'Rua do responsável do idoso' })
	logradouro: string;

	@ApiProperty({
		description: 'Número da residência do responsável do idoso',
	})
	endereco_numero: string;

	@ApiProperty({ description: 'Bairro do responsável do idoso' })
	bairro: string;

	@ApiProperty({ description: 'CEP do responsável do idoso' })
	cep: string;

	@ApiProperty({ description: 'Estado do responsável do idoso' })
	estado: string;

	@ApiProperty({ description: 'Cidade do responsável do idoso' })
	cidade: string;

	@ApiProperty({ description: 'Telefone 1 do responsável do idoso' })
	telefone_1: string;

	@ApiPropertyOptional({ description: 'Telefone 2 do responsável do idoso' })
	telefone_2: string | null;

	@ApiProperty({ description: 'Data de criação do responsável do idoso' })
	criado_em: Date;

	@ApiProperty({
		description: 'Data da última atualização do responsável do idoso',
	})
	atualizado_em: Date;

	@ApiProperty({ description: 'ID do idoso' })
	id_idoso: bigint;
}
