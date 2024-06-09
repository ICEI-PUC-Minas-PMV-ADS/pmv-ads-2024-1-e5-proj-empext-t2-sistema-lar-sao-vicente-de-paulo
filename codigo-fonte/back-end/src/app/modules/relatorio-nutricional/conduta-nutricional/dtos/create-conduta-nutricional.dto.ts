import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCondutaNutricionalDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	data: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	dieta: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	volume: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	fracionamento: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	kcal_dia: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	ptn_dia: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	agua_ml: string;

	@ApiProperty()
	@IsNotEmpty()
	id_ficha_nutricional: bigint;
}
