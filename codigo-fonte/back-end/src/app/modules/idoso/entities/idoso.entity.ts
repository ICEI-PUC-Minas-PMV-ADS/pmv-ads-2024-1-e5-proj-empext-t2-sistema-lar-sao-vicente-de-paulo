import { ApiProperty } from '@nestjs/swagger';
import { Idoso as IdosoModel, $Enums } from '@prisma/client';

export class Idoso implements IdosoModel {
	@ApiProperty({ description: 'ID do idoso' })
	id: bigint;

	@ApiProperty({ description: 'UID do idoso' })
	uid: string;

	@ApiProperty({ description: 'ID do usuário associado ao idoso' })
	id_usuario: bigint;

	@ApiProperty({ description: 'Foto do idoso' })
	foto: Buffer;

	@ApiProperty({ description: 'Nome completo do idoso' })
	nome_completo: string;

	@ApiProperty({ description: 'Data de nascimento do idoso' })
	data_nascimento: Date;

	@ApiProperty({ description: 'Naturalidade do idoso' })
	naturalidade: string;

	@ApiProperty({ description: 'Estado do idoso' })
	estado: string;

	@ApiProperty({ description: 'País do idoso' })
	pais: string;

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

	@ApiProperty({ description: 'CPF do idoso' })
	cpf: string;

	@ApiProperty({ description: 'CNH do idoso' })
	cnh: string;

	@ApiProperty({ description: 'RG do idoso' })
	rg: string;

	@ApiProperty({ description: 'Órgão expedidor do RG do idoso' })
	rg_orgao_expedidor: string;

	@ApiProperty({ description: 'Título de eleitor do idoso' })
	titulo_eleitor: string;

	@ApiProperty({ description: 'Seção do título de eleitor do idoso' })
	titulo_eleitor_secao: string;

	@ApiProperty({ description: 'Zona do título de eleitor do idoso' })
	titulo_eleitor_zona: string;

	@ApiProperty({ description: 'Certidão de nascimento do idoso' })
	certidao_nascimento: string;

	@ApiProperty({ description: 'Folha da certidão de nascimento do idoso' })
	certidao_nascimento_folha: string;

	@ApiProperty({ description: 'Livro da certidão de nascimento do idoso' })
	certidao_nascimento_livro: string;

	@ApiProperty({ description: 'Certidão de casamento do idoso' })
	certidao_casamento: string;

	@ApiProperty({ description: 'Folha da certidão de casamento do idoso' })
	certidao_casamento_folha: string;

	@ApiProperty({ description: 'Livro da certidão de casamento do idoso' })
	certidao_casamento_livro: string;

	@ApiProperty({
		enum: ['ATIVO', 'INATIVO', 'PENDENTE'],
		description: 'Situação do idoso',
	})
	situacao: $Enums.Situacao;

	@ApiProperty({ description: 'Motivo de inativação do idoso' })
	motivo_inativacao: string;

	@ApiProperty({ description: 'Data de criação do registro' })
	criado_em: Date;

	@ApiProperty({ description: 'Data da última atualização do registro' })
	atualizado_em: Date;
}
