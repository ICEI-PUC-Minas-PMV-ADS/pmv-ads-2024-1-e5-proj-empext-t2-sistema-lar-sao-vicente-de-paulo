import { IsCPF } from '@/common/decorators/is-cpf.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsDateString,
	Matches,
	MaxLength,
	IsOptional,
} from 'class-validator';

export class CreateIdosoDto {
	@ApiProperty({ description: 'ID do usuário associado ao idoso' })
	@IsNotEmpty()
	id_usuario: bigint;

	@ApiPropertyOptional({ description: 'Foto do usuário' })
	@IsString()
	@IsOptional()
	foto?: string;

	@ApiProperty({ description: 'Nome completo do idoso' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome_completo: string;

	@ApiPropertyOptional({ description: 'Apelido do idoso' })
	@IsOptional()
	@IsString()
	apelido?: string;

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

	@ApiProperty({ description: 'Gênero do idoso' })
	@IsNotEmpty()
	@IsString()
	genero: string;

	@ApiProperty({ description: 'Cidade do idoso' })
	@IsNotEmpty()
	@IsString()
	cidade: string;

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

	@ApiPropertyOptional({ description: 'CPF do idoso' })
	@IsOptional()
	@IsString()
	@IsCPF()
	cpf?: string;

	@ApiPropertyOptional({ description: 'CNH do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(8)
	cnh?: string;

	@ApiPropertyOptional({ description: 'Cartão do SUS do idoso' })
	@IsOptional()
	@IsString()
	cartao_sus?: string;

	@ApiPropertyOptional({ description: 'RG do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(10)
	rg?: string;

	@ApiPropertyOptional({ description: 'Órgão expedidor do RG do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	rg_orgao_expedidor?: string;

	@ApiPropertyOptional({ description: 'Título de eleitor do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(12)
	titulo_eleitor?: string;

	@ApiPropertyOptional({ description: 'Seção do título de eleitor do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(4)
	titulo_eleitor_secao?: string;

	@ApiPropertyOptional({ description: 'Zona do título de eleitor do idoso' })
	@IsOptional()
	@IsString()
	@MaxLength(3)
	titulo_eleitor_zona?: string;

	@ApiPropertyOptional({
		description: 'Folha da certidão de nascimento do idoso',
	})
	@IsOptional()
	@IsString()
	@MaxLength(20)
	certidao_nascimento_folha?: string;

	@ApiPropertyOptional({
		description: 'Livro da certidão de nascimento do idoso',
	})
	@IsOptional()
	@IsString()
	@MaxLength(20)
	certidao_nascimento_livro?: string;

	@ApiPropertyOptional({
		description: 'Folha da certidão de casamento do idoso',
	})
	@IsOptional()
	@IsString()
	@MaxLength(20)
	certidao_casamento_folha?: string;

	@ApiPropertyOptional({
		description: 'Livro da certidão de casamento do idoso',
	})
	@IsOptional()
	@IsString()
	@MaxLength(20)
	certidao_casamento_livro?: string;
}
