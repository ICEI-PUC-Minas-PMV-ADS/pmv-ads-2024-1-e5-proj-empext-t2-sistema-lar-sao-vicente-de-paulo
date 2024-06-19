import { ApiProperty } from '@nestjs/swagger';
import {
	pesoTipo,
	caloriaMetodo,
	proteinaMetodo,
	$Enums,
} from '@prisma/client';
import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateNecessidadeNutricionalDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	peso: string;

	@ApiProperty({ enum: $Enums.pesoTipo })
	@IsNotEmpty()
	@IsEnum($Enums.pesoTipo)
	peso_tipo: pesoTipo;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(50)
	peso_obs?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	caloria: string;

	@ApiProperty({ enum: $Enums.caloriaMetodo })
	@IsNotEmpty()
	@IsEnum($Enums.caloriaMetodo)
	caloria_metodo: caloriaMetodo;

	@ApiProperty()
	@IsOptional()
	@IsString()
	caloria_observacao?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(50)
	proteina?: string;

	@ApiProperty({ enum: $Enums.proteinaMetodo })
	@IsNotEmpty()
	@IsEnum($Enums.proteinaMetodo)
	proteina_metodo: proteinaMetodo;

	@ApiProperty()
	@IsOptional()
	@IsString()
	proteina_observacao?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	hidrica: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(50)
	hidrica_observacao?: string;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
