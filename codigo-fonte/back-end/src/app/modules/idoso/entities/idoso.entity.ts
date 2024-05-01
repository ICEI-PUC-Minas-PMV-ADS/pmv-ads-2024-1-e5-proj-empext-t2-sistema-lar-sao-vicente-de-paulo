import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Idoso as IdosoModel, $Enums } from '@prisma/client';

export class Idoso implements IdosoModel {
	@ApiProperty({ description: 'ID do idoso' })
	id: bigint;

	@ApiProperty({ description: 'UID do idoso' })
	uid: string;

	@ApiProperty({ description: 'ID do usuário associado ao idoso' })
	id_usuario: bigint;

	@ApiPropertyOptional({ description: 'Foto do idoso' })
	foto: string | null;

	@ApiProperty({ description: 'Nome completo do idoso' })
	nome_completo: string;

	@ApiPropertyOptional({ description: 'Apelido do idoso' })
	apelido: string | null;

	@ApiProperty({ description: 'Gênero do idoso' })
	genero: string;

	@ApiProperty({ description: 'Cidade do idoso' })
	cidade: string;

	@ApiProperty({ description: 'Data de nascimento do idoso' })
	data_nascimento: Date;

	@ApiProperty({ description: 'Naturalidade do idoso' })
	naturalidade: string;

	@ApiProperty({ description: 'Estado do idoso' })
	estado: string;

	@ApiProperty({ description: 'Estado civil do idoso' })
	estado_civil: string;

	@ApiProperty({ description: 'Religião do idoso' })
	religiao: string;

	@ApiProperty({ description: 'Escolaridade do idoso' })
	escolaridade: string;

	@ApiProperty({ description: 'Nome do pai do idoso' })
	nome_pai: string;

	@ApiProperty({ description: 'Nome da mãe do idoso' })
	nome_mae: string;

	@ApiProperty({ description: 'Data de ingresso do idoso' })
	data_ingresso: Date;

	@ApiPropertyOptional({ description: 'CPF do idoso' })
	cpf: string | null;

	@ApiPropertyOptional({ description: 'CNH do idoso' })
	cnh: string | null;

	@ApiPropertyOptional({ description: 'RG do idoso' })
	rg: string | null;

	@ApiPropertyOptional({ description: 'Cartão do SUS do idoso' })
	cartao_sus: string | null;

	@ApiPropertyOptional({ description: 'Órgão expedidor do RG do idoso' })
	rg_orgao_expedidor: string | null;

	@ApiPropertyOptional({ description: 'Título de eleitor do idoso' })
	titulo_eleitor: string | null;

	@ApiPropertyOptional({ description: 'Seção do título de eleitor do idoso' })
	titulo_eleitor_secao: string | null;

	@ApiPropertyOptional({ description: 'Zona do título de eleitor do idoso' })
	titulo_eleitor_zona: string | null;

	@ApiPropertyOptional({
		description: 'Folha da certidão de nascimento do idoso',
	})
	certidao_nascimento_folha: string | null;

	@ApiPropertyOptional({
		description: 'Livro da certidão de nascimento do idoso',
	})
	certidao_nascimento_livro: string | null;

	@ApiPropertyOptional({
		description: 'Folha da certidão de casamento do idoso',
	})
	certidao_casamento_folha: string | null;

	@ApiPropertyOptional({
		description: 'Livro da certidão de casamento do idoso',
	})
	certidao_casamento_livro: string | null;

	@ApiProperty({
		enum: ['ATIVO', 'INATIVO', 'PENDENTE'],
		description: 'Situação do idoso',
	})
	situacao: $Enums.Situacao;

	@ApiPropertyOptional({ description: 'Motivo de inativação do idoso' })
	motivo_inativacao: string | null;

	@ApiProperty({ description: 'Data de criação do registro' })
	criado_em: Date;

	@ApiProperty({ description: 'Data da última atualização do registro' })
	atualizado_em: Date;
}
