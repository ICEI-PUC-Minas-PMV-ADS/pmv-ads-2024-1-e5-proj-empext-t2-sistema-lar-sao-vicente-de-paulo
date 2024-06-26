import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateModeloRelatorioPiaDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	nome: string;
}
