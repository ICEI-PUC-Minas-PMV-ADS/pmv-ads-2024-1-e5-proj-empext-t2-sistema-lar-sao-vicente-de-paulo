import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRelatorioPiaRespostaDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	titulo: string;

	@ApiProperty({ enum: $Enums.tiposReposta })
	@IsEnum($Enums.tiposReposta, {
		message: 'O tipo deve ser TEXT, RADIO ou CHECKBOX.',
	})
	tipo: $Enums.tiposReposta;

	@ApiProperty()
	@IsNotEmpty()
	id_relatorio_pia_pergunta: bigint;
}
