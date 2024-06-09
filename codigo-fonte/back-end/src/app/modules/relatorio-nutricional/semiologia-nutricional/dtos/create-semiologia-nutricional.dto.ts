import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSemiologiaNutricionalDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	perda_aparente: string;

	@ApiProperty({ enum: $Enums.Status })
	@IsNotEmpty()
	@IsEnum($Enums.Status)
	gordura_subcutanea: $Enums.Status;

	@ApiProperty({ enum: $Enums.Edema })
	@IsNotEmpty()
	@IsEnum($Enums.Edema)
	edema: $Enums.Edema;

	@ApiProperty({ enum: $Enums.LocalEdema })
	@IsNotEmpty()
	@IsEnum($Enums.LocalEdema)
	local_edema: $Enums.LocalEdema;

	@ApiProperty({ enum: $Enums.Status })
	@IsNotEmpty()
	@IsEnum($Enums.Status)
	ascite: $Enums.Status;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
