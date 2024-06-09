import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateQuadroClinicoDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	data: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	aceitacao_alimentar: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	suplemento_oral: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	apetite: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	disfagia: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	nausea_vomito: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	dor_abdominal: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	evacuacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	diurese: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(20)
	observacao?: string;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
