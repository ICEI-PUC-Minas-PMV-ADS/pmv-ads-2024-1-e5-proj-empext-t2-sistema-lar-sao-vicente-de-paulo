import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsDateString } from 'class-validator';

enum Situacao {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    PENDENTE = 'PENDENTE',
}

export class CreateIdosoDto {

    @ApiProperty({ description: 'ID do usuário associado ao idoso' })
    @IsNotEmpty()
    usuario_id: bigint;

    @ApiProperty({ description: 'Nome completo do idoso' })
    @IsNotEmpty()
    @IsString()
    nome_completo: string;

    @ApiProperty({ description: 'Data de nascimento do idoso' })
    @IsNotEmpty()
    @IsDateString()
    data_nascimento: Date;

    @ApiProperty({ description: 'Naturalidade do idoso' })
    @IsNotEmpty()
    @IsString()
    naturalidade: string;

    @ApiProperty({ description: 'Estado do idoso' })
    @IsNotEmpty()
    @IsString()
    estado: string;

    @ApiProperty({ description: 'País do idoso' })
    @IsNotEmpty()
    @IsString()
    pais: string;

    @ApiProperty({ description: 'Estado civil do idoso' })
    @IsNotEmpty()
    @IsString()
    estado_civil: string;

    @ApiProperty({ description: 'Religião do idoso' })
    @IsNotEmpty()
    @IsString()
    religiao: string;

    @ApiProperty({ description: 'Escolaridade do idoso' })
    @IsNotEmpty()
    @IsString()
    escolaridade: string;

    @ApiProperty({ description: 'Nome do pai do idoso' })
    @IsNotEmpty()
    @IsString()
    nome_pai: string;

    @ApiProperty({ description: 'Nome da mãe do idoso' })
    @IsNotEmpty()
    @IsString()
    nome_mae: string;

    @ApiProperty({ description: 'Data de ingresso do idoso' })
    @IsNotEmpty()
    @IsDateString()
    data_ingresso: Date;

    @ApiProperty({ description: 'CPF do idoso' })
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty({ description: 'CNH do idoso' })
    @IsNotEmpty()
    @IsString()
    cnh: string;

    @ApiProperty({ description: 'RG do idoso' })
    @IsNotEmpty()
    @IsString()
    rg: string;

    @ApiProperty({ description: 'Órgão expedidor do RG do idoso' })
    @IsNotEmpty()
    @IsString()
    rg_orgao_expedidor: string;

    @ApiProperty({ description: 'Título de eleitor do idoso' })
    @IsNotEmpty()
    @IsString()
    titulo_eleitor: string;

    @ApiProperty({ description: 'Seção do título de eleitor do idoso' })
    @IsNotEmpty()
    @IsString()
    titulo_eleitor_secao: string;

    @ApiProperty({ description: 'Zona do título de eleitor do idoso' })
    @IsNotEmpty()
    @IsString()
    titulo_eleitor_zona: string;

    @ApiProperty({ description: 'Certidão de nascimento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_nascimento: string;

    @ApiProperty({ description: 'Folha da certidão de nascimento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_nascimento_folha: string;

    @ApiProperty({ description: 'Livro da certidão de nascimento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_nascimento_livro: string;

    @ApiProperty({ description: 'Certidão de casamento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_casamento: string;

    @ApiProperty({ description: 'Folha da certidão de casamento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_casamento_folha: string;

    @ApiProperty({ description: 'Livro da certidão de casamento do idoso' })
    @IsNotEmpty()
    @IsString()
    certidao_casamento_livro: string;
}