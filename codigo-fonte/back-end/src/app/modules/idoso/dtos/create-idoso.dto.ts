import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, isInt, isNumber, isNumberString, isString } from "class-validator";

enum IdosoGenero {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO'
}

enum IdosoSituacao {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
}

export class CreateIdosoDto {

    @ApiProperty()
    @IsString()
    usuario_id: string

    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsDateString()
    data_nascimento: Date;

    @ApiProperty()
    @IsDateString()
    data_admissao: Date;

    @ApiProperty()
    @IsString()
    cpf_cnh: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    nome_pai?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    nome_mae?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    responsavel?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    telefone_responsavel?: string;

    @ApiProperty({
        enum: IdosoGenero
    })
    @IsEnum(IdosoGenero)
    genero: IdosoGenero;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    leito?: string;
}