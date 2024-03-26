import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCargoDto {
	@ApiProperty()
	@IsString()
	nome: string;
}
