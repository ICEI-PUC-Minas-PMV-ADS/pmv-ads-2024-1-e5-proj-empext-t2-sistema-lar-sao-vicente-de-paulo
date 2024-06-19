import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAntropometriaDto {
	@ApiProperty({ enum: $Enums.tiposTriagem })
	@IsNotEmpty()
	@IsEnum($Enums.tiposTriagem)
	triagem: $Enums.tiposTriagem;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	triagem_obs: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	escore: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(200)
	triagem_classificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(200)
	perda_peso: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	peso_atual: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	peso_estimado: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	peso_seco: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	pp_kg: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	pp: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	pp_tempo: string;

	@ApiProperty({ enum: $Enums.PPStatus })
	@IsNotEmpty()
	@IsEnum($Enums.PPStatus)
	pp_classificacao: $Enums.PPStatus;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	altura_atual: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	altura_estimada: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	altura_aj: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	imc: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	imc_classificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	circ_braco: string;

	@ApiProperty({ enum: $Enums.ladoBraco })
	@IsNotEmpty()
	@IsEnum($Enums.ladoBraco)
	braco_lado: $Enums.ladoBraco;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	circ_braco_percentil: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	circ_braco_classificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	circ_panturrilha: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	circ_panturrilha_percentil: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	circ_panturrilha_classificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(10)
	circ_abdominal: string;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
