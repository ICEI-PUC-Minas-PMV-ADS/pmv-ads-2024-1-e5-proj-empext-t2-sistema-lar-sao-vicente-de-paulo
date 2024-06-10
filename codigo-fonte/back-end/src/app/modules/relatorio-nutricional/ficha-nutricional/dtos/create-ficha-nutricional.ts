import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateFichaNutricionalDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(300)
	especificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	alergia_intolerancia: boolean;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(100)
	alergia_intolerancia_obs?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(300)
	observacao?: string;

	@ApiProperty()
	@IsNotEmpty()
	id_idoso: bigint;

	@ApiProperty()
	@IsNotEmpty()
	id_usuario: bigint;
}
