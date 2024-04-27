import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResponsavelIdosoDto {
	@ApiProperty({ description: 'Parentesco do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	parentesco: string;

	@ApiProperty({ description: 'Nome do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	nome_completo: string;

	@ApiProperty({ description: 'Rua do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	logradouro: string;

	@ApiProperty({
		description: 'Número da residência do responsável do idoso',
	})
	@IsString()
	@IsNotEmpty()
	endereco_numero: string;

	@ApiProperty({ description: 'Bairro do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	bairro: string;

	@ApiProperty({ description: 'CEP do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	cep: string;

	@ApiProperty({ description: 'Estado do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	estado: string;

	@ApiProperty({ description: 'Cidade do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	cidade: string;

	@ApiProperty({ description: 'Telefone 1 do responsável do idoso' })
	@IsString()
	@IsNotEmpty()
	telefone_1: string;

	@ApiPropertyOptional({ description: 'Telefone 2 do responsável do idoso' })
	@IsString()
	@IsOptional()
	telefone_2: string | null;

	@ApiProperty({ description: 'ID do idoso' })
	@IsNotEmpty()
	id_idoso: bigint;
}
