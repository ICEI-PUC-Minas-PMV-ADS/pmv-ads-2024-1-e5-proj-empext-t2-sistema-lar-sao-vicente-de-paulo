import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateIdosoDto {
    @ApiPropertyOptional({ description: 'Nome completo do idoso' })
    @IsString()
    nome_completo: string;

    @ApiPropertyOptional({ description: 'Data de nascimento do idoso' })
    @IsDateString()
    data_nascimento: Date;

    @ApiPropertyOptional({ description: 'Naturalidade do idoso' })
    @IsString()
    naturalidade: string;

    @ApiPropertyOptional({ description: 'Estado do idoso' })
    @IsString()
    estado: string;

    @ApiPropertyOptional({ description: 'País do idoso' })
    @IsString()
    pais: string;

    @ApiPropertyOptional({ description: 'Estado civil do idoso' })
    @IsString()
    estado_civil: string;

    @ApiPropertyOptional({ description: 'Religião do idoso' })
    @IsString()
    religiao: string;

    @ApiPropertyOptional({ description: 'Escolaridade do idoso' })
    @IsString()
    escolaridade: string;

    @ApiPropertyOptional({ description: 'Nome do pai do idoso' })
    @IsString()
    nome_pai: string;

    @ApiPropertyOptional({ description: 'Nome da mãe do idoso' })
    @IsString()
    nome_mae: string;

    @ApiPropertyOptional({ description: 'Data de ingresso do idoso' })
    @IsDateString()
    data_ingresso: Date;

    @ApiPropertyOptional({ description: 'CPF do idoso' })
    @IsString()
    cpf: string;

    @ApiPropertyOptional({ description: 'CNH do idoso' })
    @IsString()
    cnh: string;

    @ApiPropertyOptional({ description: 'RG do idoso' })
    @IsString()
    rg: string;

    @ApiPropertyOptional({ description: 'Órgão expedidor do RG do idoso' })
    @IsString()
    rg_orgao_expedidor: string;

    @ApiPropertyOptional({ description: 'Título de eleitor do idoso' })
    @IsString()
    titulo_eleitor: string;

    @ApiPropertyOptional({ description: 'Seção do título de eleitor do idoso' })
    @IsString()
    titulo_eleitor_secao: string;

    @ApiPropertyOptional({ description: 'Zona do título de eleitor do idoso' })
    @IsString()
    titulo_eleitor_zona: string;

    @ApiPropertyOptional({ description: 'Certidão de nascimento do idoso' })
    @IsString()
    certidao_nascimento: string;

    @ApiPropertyOptional({ description: 'Folha da certidão de nascimento do idoso' })
    @IsString()
    certidao_nascimento_folha: string;

    @ApiPropertyOptional({ description: 'Livro da certidão de nascimento do idoso' })
    @IsString()
    certidao_nascimento_livro: string;

    @ApiPropertyOptional({ description: 'Certidão de casamento do idoso' })
    @IsString()
    certidao_casamento: string;

    @ApiPropertyOptional({ description: 'Folha da certidão de casamento do idoso' })
    @IsString()
    certidao_casamento_folha: string;

    @ApiPropertyOptional({ description: 'Livro da certidão de casamento do idoso' })
    @IsString()
    certidao_casamento_livro: string;

}
