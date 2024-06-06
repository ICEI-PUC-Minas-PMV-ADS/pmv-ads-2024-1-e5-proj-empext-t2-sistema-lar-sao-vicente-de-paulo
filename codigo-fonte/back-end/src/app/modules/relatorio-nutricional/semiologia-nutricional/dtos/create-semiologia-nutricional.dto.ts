import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSemiologiaNutricionalDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	perda_aparente: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum($Enums.Status)
	gordura_subcutanea: $Enums.Status;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum($Enums.Edema)
	edema: $Enums.Edema;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum($Enums.LocalEdema)
	local_edema: $Enums.LocalEdema;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum($Enums.Status)
	ascite: $Enums.Status;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
