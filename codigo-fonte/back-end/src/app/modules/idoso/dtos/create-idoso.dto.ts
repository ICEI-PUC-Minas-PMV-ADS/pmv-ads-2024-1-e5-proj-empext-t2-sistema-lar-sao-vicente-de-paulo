import { IsCPF } from '@/common/decorators/is-cpf.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsDateString,
	Matches,
	MaxLength,
} from 'class-validator';

export class CreateIdosoDto {
	@ApiProperty({ description: 'ID do usuário associado ao idoso' })
	@IsNotEmpty()
	id_usuario: bigint;

	@ApiPropertyOptional({ description: 'Foto do usuário' })
	@IsString()
	foto?: string;

	@ApiProperty({ description: 'Nome completo do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome_completo: string;

	@ApiProperty({ description: 'Data de nascimento do idoso' })
	@IsNotEmpty()
	@IsDateString()
	data_nascimento: Date;

	@ApiProperty({ description: 'Naturalidade do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	naturalidade: string;

	@ApiProperty({ description: 'Estado do idoso' })
	@IsNotEmpty()
	@IsString()
	@Matches(/^[A-Z]{2}$/, { message: 'Informe uma sigla de estado válida' })
	estado: string;

	@ApiProperty({ description: 'País do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	pais: string;

	@ApiProperty({ description: 'Estado civil do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	estado_civil: string;

	@ApiProperty({ description: 'Religião do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	religiao: string;

	@ApiProperty({ description: 'Escolaridade do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	escolaridade: string;

	@ApiProperty({ description: 'Nome do pai do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome_pai: string;

	@ApiProperty({ description: 'Nome da mãe do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome_mae: string;

	@ApiProperty({ description: 'Data de ingresso do idoso' })
	@IsNotEmpty()
	@IsDateString()
	data_ingresso: Date;

	@ApiProperty({ description: 'CPF do idoso' })
	@IsNotEmpty()
	@IsString()
	@IsCPF()
	cpf: string;

	@ApiProperty({ description: 'CNH do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(8)
	cnh: string;

	@ApiProperty({ description: 'RG do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	rg: string;

	@ApiProperty({ description: 'Órgão expedidor do RG do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	rg_orgao_expedidor: string;

	@ApiProperty({ description: 'Título de eleitor do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(12)
	titulo_eleitor: string;

	@ApiProperty({ description: 'Seção do título de eleitor do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(4)
	titulo_eleitor_secao: string;

	@ApiProperty({ description: 'Zona do título de eleitor do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(3)
	titulo_eleitor_zona: string;

	@ApiProperty({ description: 'Certidão de nascimento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(30)
	certidao_nascimento: string;

	@ApiProperty({ description: 'Folha da certidão de nascimento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	certidao_nascimento_folha: string;

	@ApiProperty({ description: 'Livro da certidão de nascimento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	certidao_nascimento_livro: string;

	@ApiProperty({ description: 'Certidão de casamento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(30)
	certidao_casamento: string;

	@ApiProperty({ description: 'Folha da certidão de casamento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	certidao_casamento_folha: string;

	@ApiProperty({ description: 'Livro da certidão de casamento do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	certidao_casamento_livro: string;
}
