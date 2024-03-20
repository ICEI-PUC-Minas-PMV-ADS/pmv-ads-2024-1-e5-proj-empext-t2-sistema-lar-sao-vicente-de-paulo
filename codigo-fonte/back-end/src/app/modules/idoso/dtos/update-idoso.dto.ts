import { IsCPF } from '@/common/decorators/is-cpf.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateIdosoDto {
    @ApiPropertyOptional({ description: 'Nome completo do idoso' })
    @IsString()
    @MaxLength(255)
    nome_completo?: string;

    @ApiPropertyOptional({ description: 'Data de nascimento do idoso' })
    @IsDateString()
    data_nascimento?: Date;

    @ApiPropertyOptional({ description: 'Naturalidade do idoso' })
    @IsString()
    @MaxLength(100)
    naturalidade?: string;

    @ApiPropertyOptional({ description: 'Estado do idoso' })
    @IsString()
    @Matches(/^[A-Z]{2}$/, { message: 'Informe uma sigla de estado válida' })
    estado?: string;

    @ApiPropertyOptional({ description: 'País do idoso' })
    @IsString()
    @MaxLength(100)
    pais?: string;

    @ApiPropertyOptional({ description: 'Estado civil do idoso' })
    @IsString()
    @MaxLength(20)
    estado_civil?: string;

    @ApiPropertyOptional({ description: 'Religião do idoso' })
    @IsString()
    @MaxLength(50)
    religiao?: string;

    @ApiPropertyOptional({ description: 'Escolaridade do idoso' })
    @IsString()
    @MaxLength(50)
    escolaridade?: string;

    @ApiPropertyOptional({ description: 'Nome do pai do idoso' })
    @IsString()
    @MaxLength(255)
    nome_pai?: string;

    @ApiPropertyOptional({ description: 'Nome da mãe do idoso' })
    @IsString()
    @MaxLength(255)
    nome_mae?: string;

    @ApiPropertyOptional({ description: 'Data de ingresso do idoso' })
    @IsDateString()
    data_ingresso?: Date;

    @ApiPropertyOptional({ description: 'CPF do idoso' })
    @IsString()
    @IsCPF()
    cpf?: string;

    @ApiPropertyOptional({ description: 'CNH do idoso' })
    @IsString()
    @MaxLength(8)
    cnh?: string;

    @ApiPropertyOptional({ description: 'RG do idoso' })
    @IsString()
    @MaxLength(10)
    rg?: string;

    @ApiPropertyOptional({ description: 'Órgão expedidor do RG do idoso' })
    @IsString()
    @MaxLength(255)
    rg_orgao_expedidor?: string;

    @ApiPropertyOptional({ description: 'Título de eleitor do idoso' })
    @IsString()
    @MaxLength(12)
    titulo_eleitor?: string;

    @ApiPropertyOptional({ description: 'Seção do título de eleitor do idoso' })
    @IsString()
    @MaxLength(4)
    titulo_eleitor_secao?: string;

    @ApiPropertyOptional({ description: 'Zona do título de eleitor do idoso' })
    @IsString()
    @MaxLength(3)
    titulo_eleitor_zona?: string;

    @ApiPropertyOptional({ description: 'Certidão de nascimento do idoso' })
    @IsString()
    @MaxLength(30)
    certidao_nascimento?: string;

    @ApiPropertyOptional({ description: 'Folha da certidão de nascimento do idoso' })
    @IsString()
    @MaxLength(20)
    certidao_nascimento_folha?: string;

    @ApiPropertyOptional({ description: 'Livro da certidão de nascimento do idoso' })
    @IsString()
    @MaxLength(20)
    certidao_nascimento_livro?: string;

    @ApiPropertyOptional({ description: 'Certidão de casamento do idoso' })
    @IsString()
    @MaxLength(30)
    certidao_casamento?: string;

    @ApiPropertyOptional({ description: 'Folha da certidão de casamento do idoso' })
    @IsString()
    @MaxLength(20)
    certidao_casamento_folha?: string;

    @ApiPropertyOptional({ description: 'Livro da certidão de casamento do idoso' })
    @IsString()
    @MaxLength(20)
    certidao_casamento_livro?: string;
}
