import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegistroAntropometricoDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	peso: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	edema: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	ascite: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	imc: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	imc_classificacao: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	cb: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	cp: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	observacao: string;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
